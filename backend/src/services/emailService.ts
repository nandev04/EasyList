import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid';

export class EmailService {
  private static async getTransporter() {
    if (process.env.NODE_ENV === 'production') {
      // Prod - SendGrid
      return nodemailer.createTransport(
        sendgridTransport({
          apiKey: process.env.SENDGRID_API_KEY!
        })
      );
    }
    // Dev - SendGrid
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  static async sendVerificationEmail(to: string, token: string) {
    const verificationLink = `http://localhost:3333/auth/verify?token=${token}`;
    const transporter = await this.getTransporter();

    const info = await transporter.sendMail({
      from: 'no-reply@minhaempresa.com', // remetente validado no SendGrid
      to,
      subject: 'Confirme sua conta',
      html: `<p>Bem-vindo! Clique no link abaixo para verificar sua conta:</p>
             <a href="${verificationLink}">Verificar Conta</a>`
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  }
}
