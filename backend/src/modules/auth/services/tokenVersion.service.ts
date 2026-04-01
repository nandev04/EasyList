import { getCache, deleteCache, setCache } from '../../../infra/cache/cache.service.js';
import { AppError } from '../../../shared/utils/error.js';
import * as User_Repository from '../../user/user.repository.js';
import { userAuthSelect } from '../../user/user.select.js';

const key = 'auth:tokenVersion:';

async function getTokenVersion(userId: string) {
  let tokenVersion: number;
  const searchedVersion = await getCache(`${key}${userId}`);

  if (searchedVersion === null) {
    const user = await User_Repository.getUser(userId, userAuthSelect);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    tokenVersion = user.tokenVersion;
  } else {
    tokenVersion = +searchedVersion;
  }

  return tokenVersion;
}

async function setTokenVersion(userId: string, tokenVersion: number) {
  const ONE_DAY = 60 * 60 * 24;
  const THIRTY_DAYS = ONE_DAY * 30;

  return await setCache(`${key}${userId}`, tokenVersion, 'EX', THIRTY_DAYS);
}

async function deleteTokenVersion(userId: string) {
  return await deleteCache(`${key}${userId}`);
}

export { getTokenVersion, setTokenVersion, deleteTokenVersion };
