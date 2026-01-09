import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
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

const generateSignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_AVATARS,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

  return signedUrl;
};

export { putAvatarS3, generateSignedUrl };
