// Geçici olarak basit bir mock fonksiyon
// Gerçek uygulamada Google Cloud Text-to-Speech API kullanılacak
export async function textToSpeech(text: string, language: string = 'tr-TR'): Promise<string> {
  try {
    // Şimdilik basit bir mock yanıt
    // Gerçek uygulamada bu kısım Google Cloud Text-to-Speech API ile değiştirilecek
    console.log('Text-to-Speech işlemi başlatıldı:', text, language);
    
    // Mock ses dosyası URL'i - gerçek uygulamada bu kısım API'den gelecek
    const mockAudioUrl = `/api/mock-audio?text=${encodeURIComponent(text)}&lang=${language}`;
    
    return mockAudioUrl;
  } catch (error) {
    console.error('Text-to-Speech error:', error);
    throw new Error('Metin sese çevrilemedi');
  }
} 