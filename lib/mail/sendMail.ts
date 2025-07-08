import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(emailData: EmailData): Promise<boolean> {
  try {
    // Gerekli environment variable'ları kontrol et
    const gmailUser = process.env.GMAIL_USER;
    const gmailClientId = process.env.GMAIL_CLIENT_ID;
    const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;

    // E-posta ayarları eksikse mock yanıt döndür
    if (!gmailUser || !gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      console.log('Gmail API ayarları eksik, e-posta gönderilmedi (mock)');
      console.log('Gönderilecek e-posta:', emailData);
      return true; // Mock olarak başarılı döndür
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: gmailUser,
        clientId: gmailClientId,
        clientSecret: gmailClientSecret,
        refreshToken: gmailRefreshToken,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

export function createCallSummaryEmail(
  firmName: string,
  transcript: string,
  gptResponse: string,
  callDate: Date
): EmailData {
  return {
    to: process.env.GMAIL_USER || 'admin@example.com',
    subject: `WerbundoCall - ${firmName} Çağrı Özeti`,
    html: `
      <h2>WerbundoCall Çağrı Özeti</h2>
      <p><strong>Firma:</strong> ${firmName}</p>
      <p><strong>Tarih:</strong> ${callDate.toLocaleString('tr-TR')}</p>
      
      <h3>Müşteri Konuşması:</h3>
      <p>${transcript}</p>
      
      <h3>AI Yanıtı:</h3>
      <p>${gptResponse}</p>
      
      <hr>
      <p><em>Bu e-posta WerbundoCall sistemi tarafından otomatik olarak gönderilmiştir.</em></p>
    `,
  };
} 