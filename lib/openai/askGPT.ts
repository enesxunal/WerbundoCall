import OpenAI from 'openai';

// API key kontrolü
const apiKey = process.env.OPENAI_API_KEY;

let openai: OpenAI | null = null;

if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
  });
}

export async function askGPT(transcript: string, prompt: string): Promise<string> {
  try {
    // API key yoksa mock yanıt döndür
    if (!openai || !apiKey) {
      console.log('OpenAI API key bulunamadı, mock yanıt döndürülüyor');
      return `Merhaba! ${prompt} hakkında size yardımcı olmaktan memnuniyet duyarım. ${transcript} konusunda şu bilgileri verebilirim: Ürünümüz hakkında detaylı bilgi almak için web sitemizi ziyaret edebilir veya müşteri hizmetlerimizi arayabilirsiniz.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: transcript
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Yanıt alınamadı';
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Hata durumunda da mock yanıt döndür
    return `Üzgünüm, şu anda teknik bir sorun yaşıyoruz. Size daha sonra yardımcı olabiliriz. ${transcript} konusunda lütfen web sitemizi ziyaret edin.`;
  }
} 