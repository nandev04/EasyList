import nodemailer, { Transporter } from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid';

let cachedTransporter: Transporter | null = null;

export const getTransporter = async (): Promise<Transporter> => {
  if (cachedTransporter) return cachedTransporter;

  const testAccount = await nodemailer.createTestAccount();
  cachedTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  return cachedTransporter;
};
