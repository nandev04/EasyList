import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid';

const getTransporter = async () => {
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
};

const sendVerificationMail = async (to: string, token: string) => {
  const transporter = await getTransporter();
  const verificationLink = `http://localhost:3333/auth/verify?token=${token}`;

  const template = `<p>Bem-vindo! Clique no link abaixo para verificar sua conta:</p>
             <a href="${verificationLink}">Verificar Conta</a>`;

  const info = await transporter.sendMail({
    from: 'no-reply@minhaempresa.com', // remetente validado no SendGrid
    to,
    subject: 'Confirme sua conta',
    html: template
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

const sendForgotPasswordEmail = async (to: string, code: string) => {
  const template = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição de senha. Use o código abaixo para continuar:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>Este código expira em 15 minutos.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">
          Se você não solicitou esta ação, ignore este e-mail.
        </p>
      </div>
    `;

  const transporter = await getTransporter();

  const info = await transporter.sendMail({
    from: 'no-reply@minhaempresa.com',
    to,
    subject: 'Seu código de verificação',
    html: template
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

const sendOTPEmail = async (to: string, code: string) => {
  const template = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    
    <h2 style="margin-bottom: 10px;">Confirmação de troca de e-mail</h2>

    <p style="color: #555;">
      Recebemos uma solicitação para alterar o e-mail associado à sua conta.
    </p>

    <p style="color: #555;">
      Novo e-mail solicitado:
    </p>

    <p style="font-weight: bold; font-size: 16px; margin-bottom: 20px;">
      ${to}
    </p>

    <p style="color: #555;">
      Para confirmar essa alteração, utilize o código de verificação abaixo:
    </p>

    <div style="background: #f7f7f7; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px;">
        ${code}
      </span>
    </div>

    <p style="color: #555;">
      Este código expira em <strong>15 minutos</strong>.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #888;">
      Se você não solicitou a alteração de e-mail, ignore esta mensagem.
      Nenhuma mudança será feita em sua conta sem a confirmação deste código.
    </p>

  </div>
</div>`;

  const transporter = await getTransporter();

  const info = await transporter.sendMail({
    from: 'no-reply@minhaempresa.com',
    to,
    subject: 'Seu código de confirmação',
    html: template
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export { sendVerificationMail, sendForgotPasswordEmail, sendOTPEmail };
