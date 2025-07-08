import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const lang = searchParams.get('lang');

    // Mock ses dosyası - gerçek uygulamada bu kısım Google TTS'den gelecek
    const mockAudioResponse = {
      text: text || 'Merhaba, size nasıl yardımcı olabilirim?',
      language: lang || 'tr-TR',
      audioUrl: '/mock-audio.mp3', // Gerçek uygulamada bu kısım dinamik olacak
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(mockAudioResponse);
  } catch (error) {
    console.error('Mock audio error:', error);
    return NextResponse.json(
      { error: 'Ses dosyası oluşturulamadı' },
      { status: 500 }
    );
  }
} 