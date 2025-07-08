import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function speechToText(audioUrl: string): Promise<string> {
  try {
    // Audio URL'den ses dosyasını indir
    const response = await fetch(audioUrl);
    const audioBuffer = await response.arrayBuffer();
    
    // Base64'e çevir
    const audioContent = Buffer.from(audioBuffer).toString('base64');

    const request = {
      audio: {
        content: audioContent,
      },
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 16000,
        languageCode: 'tr-TR', // Türkçe varsayılan
        alternativeLanguageCodes: ['en-US', 'de-DE'],
        enableAutomaticPunctuation: true,
        enableWordTimeOffsets: false,
      },
    };

    const [result] = await speechClient.recognize(request);
    const transcription = result.results
      ?.map(result => result.alternatives?.[0]?.transcript)
      .join(' ');

    return transcription || '';
  } catch (error) {
    console.error('Speech-to-Text error:', error);
    throw new Error('Ses dosyası yazıya çevrilemedi');
  }
} 