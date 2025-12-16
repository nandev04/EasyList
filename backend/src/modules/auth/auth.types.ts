interface verifyTokensType {
  refreshToken?: string;
  accessToken?: string;
  deviceId?: string;
}

interface VerifyTokensTypeResult {
  deviceUUID?: string;
  userId: number;
  newAccessToken?: string;
  newRefreshTokenRaw?: string;
}

export { verifyTokensType, VerifyTokensTypeResult };
