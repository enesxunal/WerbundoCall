import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { speechToText } from '@/lib/google/speechToText';
import { textToSpeech } from '@/lib/google/textToSpeech';
import { askGPT } from '@/lib/openai/askGPT';
import { sendMail, createCallSummaryEmail } from '@/lib/mail/sendMail';
import { detectLanguage } from '@/utils/detectLanguage';
import { z } from 'zod';

const prisma = new PrismaClient();

// Twilio webhook verilerini doğrulama şeması
const webhookSchema = z.object({
  CallSid: z.string(),
  RecordingUrl: z.string().optional(),
  From: z.string(),
  To: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Veri doğrulama
    const validatedData = webhookSchema.parse(data);
    
    if (!validatedData.RecordingUrl) {
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Kayıt bulunamadı</Say></Response>',
        { headers: { 'Content-Type': 'application/xml' } }
      );
    }

    // Ses dosyasını yazıya çevir
    const transcript = await speechToText(validatedData.RecordingUrl);
    
    // Dil algıla
    const detectedLanguage = detectLanguage(transcript);
    
    // Firma bilgilerini al (şimdilik varsayılan)
    // Gerçek uygulamada To numarasına göre firma bulunacak
    const firm = await prisma.firm.findFirst();
    
    if (!firm) {
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Firma bulunamadı</Say></Response>',
        { headers: { 'Content-Type': 'application/xml' } }
      );
    }

    // GPT'den yanıt al
    const gptResponse = await askGPT(transcript, firm.prompt);
    
    // Yanıtı sese çevir
    const audioUrl = await textToSpeech(gptResponse, firm.language);
    
    // Çağrıyı veritabanına kaydet
    const call = await prisma.call.create({
      data: {
        firmId: firm.id,
        transcript,
        audioUrl: validatedData.RecordingUrl,
        gptResponse,
      },
    });

    // E-posta gönder
    const emailData = createCallSummaryEmail(
      firm.name,
      transcript,
      gptResponse,
      new Date()
    );
    await sendMail(emailData);

    // Twilio VoiceResponse XML döndür
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${audioUrl}</Play>
  <Say>Teşekkür ederiz, görüşmek üzere.</Say>
</Response>`;

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'application/xml' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Bir hata oluştu, lütfen tekrar deneyin.</Say></Response>',
      { headers: { 'Content-Type': 'application/xml' } }
    );
  }
} 