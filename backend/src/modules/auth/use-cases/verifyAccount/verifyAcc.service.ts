import { AppError } from '../../../../shared/utils/error.js';
import { utilJwtVerifyEmail } from '../../../../shared/utils/TokenUtils.js';
import * as Repository_User from '../../../user/user.repository.js';

const verifyAccountToken = async (token: string) => {
  if (!process.env.JWT_EMAIL_SECRET) throw new Error('JWT_EMAIL_SECRET não definido!');

  try {
    const payload = await utilJwtVerifyEmail(token);
    const verifiedUser = await Repository_User.verifyUser(payload.userId);
    return verifiedUser;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
  }
};

export { verifyAccountToken };
