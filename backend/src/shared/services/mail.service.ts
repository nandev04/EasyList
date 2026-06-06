import nodemailer, { Transporter } from 'nodemailer';
import emailMask from '../utils/emailMask.js';
import { renderTemplate } from '../../emails/template.service.js';
import { getTransporter } from '../../infra/email/transporter.js';
import { env } from '../../config/env.js';
import { sendEmail } from '../utils/Resend/resendUtils.js';

const accountVerification = async (to: string, token: string) => {
  try {
    const verificationLink = `${env.FRONTEND_URL}/verify-account?token=${token}`;
    const html = await renderTemplate('accountVerification', { verificationLink });
    if (env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to,
        subject: 'Confirme sua conta',
        html
      });

      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return;
    }

    await sendEmail(to, 'Confirme seu email - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const otpForgotPassword = async (to: string, code: string) => {
  try {
    const html = await renderTemplate('otpForgotPassword', { code });
    if (env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to,
        subject: 'Seu código de verificação',
        html: html
      });

      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      return;
    }
    await sendEmail(to, 'Redefinição de senha - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const otpChangeEmail = async (to: string, code: string) => {
  try {
    const email = emailMask(to);
    const html = await renderTemplate('otpChangeEmail', { newEmail: email, code });

    if (env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to,
        subject: 'Seu código de confirmação',
        html
      });

      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return;
    }

    await sendEmail(to, 'Confirmação de alteração de email - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const emailChangeNotification = async (oldEmail: string, newEmail: string, changeDate: string) => {
  try {
    const newEmailMasked = emailMask(newEmail);
    const html = await renderTemplate('emailChangeNotification', {
      oldEmail,
      newEmail: newEmailMasked,
      changeDate
    });

    if (env.NODE_ENV === 'development') {
      const transporter: Transporter = await getTransporter();

      const info = await transporter.sendMail({
        from: 'no-reply@minhaempresa.com',
        to: oldEmail,
        subject: 'Seu código de confirmação',
        html
      });

      console.log('Mensagem enviada: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return;
    }

    await sendEmail(oldEmail, 'Seu email foi alterado - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

export { accountVerification, otpForgotPassword, otpChangeEmail, emailChangeNotification };
