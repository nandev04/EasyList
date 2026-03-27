interface verifyTokensLoginType {
  refreshToken?: string;
  accessToken?: string;
  deviceId?: string;
}

interface VerifyTokensTypeResult {
  deviceUUID?: string | undefined;
  userId: string;
  newAccessToken?: string;
  newRefreshTokenRaw?: string;
}

export { verifyTokensLoginType, VerifyTokensTypeResult };
