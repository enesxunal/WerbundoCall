export function detectLanguage(text: string): string {
  // Basit dil algılama - gerçek uygulamada daha gelişmiş bir kütüphane kullanılabilir
  const turkishWords = ['merhaba', 'teşekkür', 'evet', 'hayır', 'lütfen', 'yardım', 'bilgi'];
  const englishWords = ['hello', 'thank', 'yes', 'no', 'please', 'help', 'information'];
  const germanWords = ['hallo', 'danke', 'ja', 'nein', 'bitte', 'hilfe', 'information'];

  const lowerText = text.toLowerCase();
  
  const turkishCount = turkishWords.filter(word => lowerText.includes(word)).length;
  const englishCount = englishWords.filter(word => lowerText.includes(word)).length;
  const germanCount = germanWords.filter(word => lowerText.includes(word)).length;

  if (turkishCount > englishCount && turkishCount > germanCount) {
    return 'tr-TR';
  } else if (englishCount > turkishCount && englishCount > germanCount) {
    return 'en-US';
  } else if (germanCount > turkishCount && germanCount > englishCount) {
    return 'de-DE';
  }

  // Varsayılan olarak Türkçe
  return 'tr-TR';
} 