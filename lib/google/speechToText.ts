// Geçici olarak basit bir mock fonksiyon
// Gerçek uygulamada Google Cloud Speech-to-Text API kullanılacak
export async function speechToText(audioUrl: string): Promise<string> {
  try {
    // Şimdilik basit bir mock yanıt
    // Gerçek uygulamada bu kısım Google Cloud Speech-to-Text API ile değiştirilecek
    console.log('Speech-to-Text işlemi başlatıldı:', audioUrl);
    
    // Mock yanıt - gerçek uygulamada bu kısım API'den gelecek
    return 'Merhaba, ben müşteri hizmetleri için arıyorum. Ürününüz hakkında bilgi almak istiyorum.';
  } catch (error) {
    console.error('Speech-to-Text error:', error);
    throw new Error('Ses dosyası yazıya çevrilemedi');
  }
} 