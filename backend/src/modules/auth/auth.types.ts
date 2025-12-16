interface verifyTokens {
  refreshToken?: string;
  accessToken?: string;
  deviceId?: string;
}

interface VerifyTokensResult {
  deviceUUID?: string;
  userId: number;
  newAccessToken?: string;
  newRefreshTokenRaw?: string;
}

export { verifyTokens, VerifyTokensResult };
