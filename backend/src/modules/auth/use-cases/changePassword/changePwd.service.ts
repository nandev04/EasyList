import * as Repository_User from '../../../user/user.repository.js';
import {
  compareHashPassword,
  createHashPassword
} from '../../../../shared/utils/argon2/argon2Utils.js';
import { AppError } from '../../../../shared/utils/error.js';
import { userAuthSelect } from '../../../user/user.select.js';
import * as Auth_Service from '../../services/revokeTokens.service.js';

const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await Repository_User.getUser(userId, { ...userAuthSelect });
  if (!user) throw new AppError('Sessão inválida', 401, 'INVALID_SESSION');
  const isValid = await compareHashPassword(currentPassword, user.password);
  if (!isValid) throw new AppError('Senha atual incorreta', 400, 'WRONG_CURRENT_PASSWORD');

  const hashNewPassword = await createHashPassword(newPassword);
  await Repository_User.changePassword(user.id, hashNewPassword);

  await Auth_Service.invalidAllTokens(user.id);
};

export { changePassword };
