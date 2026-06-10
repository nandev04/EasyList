import { env } from '../../../config/env.js';
import resend from '../../../infra/resend/resendClient.js';

const sendEmail = async (to: string, subject: string, html: string) => {
  const { error } = await resend.emails.send({
    from: `EasyList <${env.SEND_EMAIL_FROM}>`,
    to,
    subject,
    html
  });

  if (error) {
    throw new Error(error.message);
  }
};

export { sendEmail };
