import nodemailer, { Transporter } from 'nodemailer';
import emailMask from '../utils/emailMask.js';
import { renderTemplate } from '../../emails/template.service.js';
import { getTransporter } from '../../infra/email/transporter.js';
import { sendEmailSES } from '../utils/aws/awsUtils.js';

const accountVerification = async (to: string, token: string) => {
  try {
    const verificationLink = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;
    const html = await renderTemplate('accountVerification', { verificationLink });
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

    await sendEmailSES('renanlvsdv@gmail.com', 'Verificação de conta - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const otpForgotPassword = async (to: string, code: string) => {
  try {
    const html = await renderTemplate('otpForgotPassword', { code });
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
    await sendEmailSES('renanlvsdv@gmail.com', 'ForgotPassword - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

const otpChangeEmail = async (to: string, code: string) => {
  try {
    const email = emailMask(to);
    const html = await renderTemplate('otpChangeEmail', { email, code });

    if (process.env.NODE_ENV === 'development') {
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

    await sendEmailSES('renanlvsdv@gmail.com', 'Change email OTP Confirmation - EasyList', html);
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

    if (process.env.NODE_ENV === 'development') {
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

    await sendEmailSES('renanlvsdv@gmail.com', 'Change email notice - EasyList', html);
  } catch (err) {
    console.error(err);
  }
};

export { accountVerification, otpForgotPassword, otpChangeEmail, emailChangeNotification };
