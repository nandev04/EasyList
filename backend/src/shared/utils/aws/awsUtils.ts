import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../../../infra/aws/s3Client.js';
import { env } from '../../../config/env.js';

const getAvatarS3 = async (filePath: string) => {
  return new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: filePath
  });
};

const putAvatarS3 = async (filePath: string, processedImageBuffer: Buffer) => {
  return new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: filePath,
    Body: processedImageBuffer,
    ContentType: 'image/webp',
    CacheControl: 'max-age=31536000, immutable'
  });
};

const deleteAvatarS3 = async (filePath: string) => {
  return new DeleteObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: filePath
  });
};

const generateSignedUrlS3 = async (command: HeadObjectCommand) => {
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export { generateSignedUrlS3, getAvatarS3, putAvatarS3, deleteAvatarS3 };
