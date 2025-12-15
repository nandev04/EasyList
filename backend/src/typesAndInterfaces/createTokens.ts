export interface createTokensType {
  hashRefreshToken: string;
  userId: number;
  deviceId: number;
  expiresAt: Date;
}

export interface createDevicesType {
  userId: number;
  deviceUUID: string;
  maxDevicePerUser: number;
}
