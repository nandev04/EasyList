import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '../../lib/s3.js';

const putAvatarS3 = async (key: string, processedImageBuffer: Buffer) => {
  return new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS!,
    Key: key,
    Body: processedImageBuffer,
    ContentType: 'image/webp'
  });
};

const deleteAvatarS3 = async (key: string) => {
  return new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS!,
    Key: key
  });
};

export { putAvatarS3, deleteAvatarS3 };
