# WerbundoCall Center SAAS v1

AI destekli çağrı merkezi çözümü. Müşteri hizmetlerinizi otomatikleştirin, 7/24 hizmet verin ve müşteri memnuniyetini artırın.

## 🚀 Özellikler

- **AI Destekli Yanıtlar**: GPT teknolojisi ile akıllı ve doğal yanıtlar
- **Çoklu Dil Desteği**: Türkçe, İngilizce ve Almanca
- **Otomatik Ses İşleme**: Google Speech-to-Text ve Text-to-Speech
- **E-posta Özetleri**: Her çağrı sonrası otomatik e-posta
- **Admin Paneli**: Firma yönetimi ve çağrı kayıtları
- **Twilio Entegrasyonu**: Telefon çağrıları için webhook desteği

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Veritabanı**: SQLite (Prisma ORM)
- **AI**: OpenAI GPT-4o-mini
- **Ses İşleme**: Google Cloud Speech-to-Text & Text-to-Speech
- **Telefon**: Twilio
- **E-posta**: Gmail API (Nodemailer)

## 📦 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd ai-callcenter
```

### 2. Bağımlılıkları Kurun

```bash
npm install
```

### 3. Veritabanını Başlatın

```bash
npx prisma migrate dev --name init
```

### 4. Çevre Değişkenlerini Ayarlayın

`.env.local` dosyasını oluşturun:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Cloud Speech-to-Text & Text-to-Speech
GOOGLE_PROJECT_ID=your_google_project_id_here
GOOGLE_CLIENT_EMAIL=your_google_client_email_here
GOOGLE_PRIVATE_KEY=your_google_private_key_here

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here

# Gmail API
GMAIL_CLIENT_ID=your_gmail_client_id_here
GMAIL_CLIENT_SECRET=your_gmail_client_secret_here
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here
GMAIL_USER=your_gmail_user_here
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacak.

## 🔧 API Anahtarları Nasıl Alınır

### OpenAI API Key
1. [OpenAI Platform](https://platform.openai.com/) adresine gidin
2. Hesap oluşturun veya giriş yapın
3. API Keys bölümünden yeni anahtar oluşturun

### Google Cloud
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni proje oluşturun
3. Speech-to-Text ve Text-to-Speech API'lerini etkinleştirin
4. Service Account oluşturun ve JSON anahtarını indirin

### Twilio
1. [Twilio Console](https://console.twilio.com/) adresine gidin
2. Hesap oluşturun
3. Account SID ve Auth Token'ı alın
4. Telefon numarası satın alın

### Gmail API
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Gmail API'yi etkinleştirin
3. OAuth 2.0 kimlik bilgileri oluşturun
4. Refresh token alın

## 📱 Kullanım

### Admin Paneli
1. [http://localhost:3000/admin](http://localhost:3000/admin) adresine gidin
2. "Yeni Firma Ekle" butonuna tıklayın
3. Firma bilgilerini doldurun:
   - **Firma Adı**: Müşteri hizmetleri veren firma adı
   - **E-posta**: Çağrı özetlerinin gönderileceği e-posta
   - **Dil**: Varsayılan dil (TR, EN, DE)
   - **AI Prompt**: GPT'ye verilecek talimatlar

### Twilio Webhook
1. Twilio Console'da telefon numaranızı ayarlayın
2. Webhook URL'ini şu şekilde ayarlayın:
   ```
   https://your-domain.com/api/call-webhook
   ```
3. Çağrı geldiğinde sistem otomatik olarak:
   - Ses dosyasını yazıya çevirir
   - GPT'den yanıt alır
   - Yanıtı sese çevirir
   - E-posta özeti gönderir

## 🗂️ Proje Yapısı

```
ai-callcenter/
│
├─ app/
│   ├─ api/
│   │   ├─ call-webhook/route.ts    # Twilio webhook
│   │   ├─ firms/route.ts           # Firma CRUD
│   │   └─ calls/route.ts           # Çağrı kayıtları
│   ├─ admin/page.tsx               # Admin sayfası
│   └─ page.tsx                     # Ana sayfa
│
├─ lib/
│   ├─ google/
│   │   ├─ speechToText.ts          # Google Speech-to-Text
│   │   └─ textToSpeech.ts          # Google Text-to-Speech
│   ├─ openai/
│   │   └─ askGPT.ts                # OpenAI GPT
│   └─ mail/
│       └─ sendMail.ts              # E-posta gönderme
│
├─ components/
│   └─ AdminPanel.tsx               # Admin panel bileşeni
│
├─ utils/
│   └─ detectLanguage.ts            # Dil algılama
│
├─ prisma/
│   └─ schema.prisma                # Veritabanı şeması
│
└─ .env.local                       # Çevre değişkenleri
```

## 🔄 Çalışma Akışı

1. **Çağrı Alınır**: Müşteri Twilio numarasını arar
2. **Ses Kaydedilir**: Twilio çağrıyı kaydeder
3. **Webhook Tetiklenir**: Kayıt URL'i API'ye gönderilir
4. **Ses Yazıya Çevrilir**: Google Speech-to-Text kullanılır
5. **Dil Algılanır**: Metin analiz edilerek dil belirlenir
6. **GPT Yanıtı Alınır**: Firma promptu ile AI yanıtı üretilir
7. **Yanıt Sese Çevrilir**: Google Text-to-Speech kullanılır
8. **E-posta Gönderilir**: Çağrı özeti firma e-postasına gönderilir
9. **Veritabanına Kaydedilir**: Tüm bilgiler saklanır

## 🚀 Deployment

### Vercel (Önerilen)
1. Projeyi GitHub'a yükleyin
2. [Vercel](https://vercel.com/) hesabı oluşturun
3. GitHub repo'nuzu bağlayın
4. Çevre değişkenlerini Vercel'de ayarlayın
5. Deploy edin

### VPS
1. Sunucunuza Node.js kurun
2. Projeyi klonlayın
3. `npm install` çalıştırın
4. PM2 ile process manager kullanın
5. Nginx reverse proxy ayarlayın

## 🔒 Güvenlik

- Tüm API anahtarları `.env.local` dosyasında saklanır
- Veri doğrulama için Zod kullanılır
- SQL injection koruması Prisma ile sağlanır
- HTTPS kullanımı zorunludur (production)

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- GitHub Issues açın
- Dokümantasyonu kontrol edin
- API anahtarlarınızın doğru olduğundan emin olun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**WerbundoCall Center SAAS v1** - AI destekli çağrı merkezi çözümü
