import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: string, tokenVersion: number) => {
  const token = jwt.sign({ userId, tokenVersion }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m'
  });
  return token;
};

const utilJwtVerifyAccess = async (accessToken: string) => {
  return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
    userId: string;
    tokenVersion: number;
  };
};

export { generateAccessToken, utilJwtVerifyAccess };
