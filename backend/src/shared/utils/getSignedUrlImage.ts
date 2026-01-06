import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from '../../lib/s3.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const generateSignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

  return signedUrl;
};

export default generateSignedUrl;
