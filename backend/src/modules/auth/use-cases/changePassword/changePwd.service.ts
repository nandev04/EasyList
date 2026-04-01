import * as Repository_User from '../../../user/user.repository.js';
import { compareHash, createHashPassword } from '../../../../shared/utils/crypto.js';
import { AppError } from '../../../../shared/utils/error.js';
import { userAuthSelect } from '../../../user/user.select.js';

const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await Repository_User.getUser(userId, userAuthSelect);
  if (!user) throw new AppError('Usuário não encontrado', 404);
  const isValid = await compareHash(currentPassword, user.password);
  if (!isValid) throw new AppError('Credenciais inválidas', 400);

  const hashNewPassword = await createHashPassword(newPassword);
  await Repository_User.changePassword(user.id, hashNewPassword);
};

export { changePassword };
