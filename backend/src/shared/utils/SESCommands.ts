import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '../../infra/aws/sesClient.js';

export async function sendEmail(to: string, subject: string, html: string) {
  const command = new SendEmailCommand({
    Source: process.env.SES_EMAIL_FROM!,
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Html: {
          Data: html
        }
      }
    }
  });

  return await sesClient.send(command);
}
