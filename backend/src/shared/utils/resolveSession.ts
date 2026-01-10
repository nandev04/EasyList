import * as Service_Auth from '../../modules/auth/auth.service.js';

const resolveSession = async (cookies: {
  accessToken?: string;
  refreshToken?: string;
  deviceId?: string;
}) => {
  return Service_Auth.verifyTokensLogin(cookies);
};

export default resolveSession;
