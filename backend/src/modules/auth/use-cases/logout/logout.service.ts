import * as Auth_Service from '../../services/revokeTokens.service.js';

const logout = async (refreshToken: string) => await Auth_Service.revokeRefreshToken(refreshToken);

export { logout };
