import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../../../infra/aws/s3Client.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '../../../infra/aws/sesClient.js';

const getAvatarS3 = async (filePath: string) => {
  return new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS!,
    Key: filePath
  });
};

const putAvatarS3 = async (filePath: string, processedImageBuffer: Buffer) => {
  return new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS!,
    Key: filePath,
    Body: processedImageBuffer,
    ContentType: 'image/webp',
    CacheControl: 'max-age=31536000, immutable'
  });
};

const deleteAvatarS3 = async (filePath: string) => {
  return new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS!,
    Key: filePath
  });
};

const generateSignedUrlS3 = async (command: HeadObjectCommand) => {
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

const sendEmailSES = async (to: string, subject: string, html: string) => {
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
};

export { generateSignedUrlS3, getAvatarS3, putAvatarS3, deleteAvatarS3, sendEmailSES };
