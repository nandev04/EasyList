import { vi } from 'vitest';

vi.mock('./src/config/env.js', () => ({
  env: {
    NODE_ENV: 'test',
    FRONTEND_URL: 'http://localhost:3000',
    JWT_ACCESS_SECRET: 'mock-jwt-secret',
    JWT_ACCESS_EXPIRES_IN: '15m',
    TOKEN_REFRESH_EXPIRES_IN: '7d',
    COOKIE_SECRET: 'mock-cookie-secret',
    AWS_S3_REGION: 'us-east-1',
    AWS_SES_REGION: 'us-east-1',
    AWS_ACCESS_KEY_ID: 'mock-access-key',
    AWS_SECRET_ACCESS_KEY: 'mock-secret-key',
    S3_BUCKET_AVATARS: 'mock-bucket',
    S3_URL_AVATARS: 'http://mock-s3.com',
    SES_EMAIL_FROM: 'noreply@mock.com',
    MAX_DEVICES_PER_USER: 5
  }
}));
