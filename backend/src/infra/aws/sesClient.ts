import { SESClient } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

dotenv.config();

export const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});
