import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(emailData: EmailData): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
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
    to: process.env.GMAIL_USER || '',
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