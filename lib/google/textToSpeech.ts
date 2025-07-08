import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';

const ttsClient = new TextToSpeechClient({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function textToSpeech(text: string, language: string = 'tr-TR'): Promise<string> {
  try {
    const request = {
      input: { text },
      voice: {
        languageCode: language,
        name: language === 'tr-TR' ? 'tr-TR-Wavenet-A' : 
              language === 'en-US' ? 'en-US-Wavenet-A' : 
              'de-DE-Wavenet-A',
        ssmlGender: 'NEUTRAL' as const,
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 0.9,
        pitch: 0,
      },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    
    if (!response.audioContent) {
      throw new Error('Ses içeriği oluşturulamadı');
    }

    // Ses dosyasını geçici olarak kaydet (gerçek uygulamada cloud storage kullanılabilir)
    const audioBuffer = Buffer.from(response.audioContent);
    const fileName = `audio_${Date.now()}.mp3`;
    
    // Bu örnekte dosyayı public klasörüne kaydediyoruz
    // Gerçek uygulamada cloud storage (AWS S3, Google Cloud Storage) kullanılmalı
    
    const publicDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const filePath = path.join(publicDir, fileName);
    fs.writeFileSync(filePath, audioBuffer);
    
    return `/audio/${fileName}`;
  } catch (error) {
    console.error('Text-to-Speech error:', error);
    throw new Error('Metin sese çevrilemedi');
  }
} 