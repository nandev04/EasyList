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
  if (!user) throw new AppError('Usuário não encontrado', 404);
  const isValid = await compareHashPassword(currentPassword, user.password);
  if (!isValid) throw new AppError('Credenciais inválidas', 400);

  const hashNewPassword = await createHashPassword(newPassword);
  await Repository_User.changePassword(user.id, hashNewPassword);

  await Auth_Service.invalidAllTokens(user.id);
};

export { changePassword };
