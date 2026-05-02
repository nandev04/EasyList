import nodemailer, { Transporter } from 'nodemailer';
import emailMask from '../utils/emailMask.js';
import { renderTemplate } from '../../emails/template.service.js';
import { getTransporter } from '../../infra/email/transporter.js';
import { sendEmail } from '../utils/SESCommands.js';

const sendVerificationMail = async (to: string, token: string) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;
    const html = await renderTemplate('verifyAccount', { verificationLink });

    if (process.env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to,
        subject: 'Confirme sua conta',
        html
      });

      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // return;
    }

    await sendEmail('renanlvsdv@gmail.com', 'Verificação de conta - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const sendForgotPasswordEmail = async (to: string, code: string) => {
  const html = await renderTemplate('forgotPassword', { code });
  try {
    if (process.env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to,
        subject: 'Seu código de verificação',
        html: html
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Mensagem enviada: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
      return;
    }
    await sendEmail('renanlvsdv@gmail.com', 'ForgotPassword - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const sendOTPEmail = async (to: string, code: string) => {
  const email = emailMask(to);
  const html = await renderTemplate('emailChangeConfirmation', { email, code });

  const transporter: Transporter = await getTransporter();

  const info = await transporter.sendMail({
    from: 'no-reply@minhaempresa.com',
    to,
    subject: 'Seu código de confirmação',
    html
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

const emailChangeNotice = async (oldEmail: string, newEmail: string, changeDate: string) => {
  const newEmailMasked = emailMask(newEmail);
  const html = await renderTemplate('emailChangeNotice', {
    oldEmail,
    newEmail: newEmailMasked,
    changeDate
  });

  const transporter: Transporter = await getTransporter();

  const info = await transporter.sendMail({
    from: 'no-reply@minhaempresa.com',
    to: oldEmail,
    subject: 'Seu código de confirmação',
    html
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Mensagem enviada: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export { sendVerificationMail, sendForgotPasswordEmail, sendOTPEmail, emailChangeNotice };
