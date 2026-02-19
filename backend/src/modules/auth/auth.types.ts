interface verifyTokensLoginType {
  refreshToken?: string;
  accessToken?: string;
  deviceId?: string;
}

interface VerifyTokensTypeResult {
  deviceUUID?: string | undefined;
  userId: number;
  newAccessToken?: string;
  newRefreshTokenRaw?: string;
}

export { verifyTokensLoginType, VerifyTokensTypeResult };
