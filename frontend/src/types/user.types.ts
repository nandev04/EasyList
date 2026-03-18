type UserDTO = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatarKey: string | null;
};

type updateUserServiceType = {
  username?: string;
  email?: string;
};

export type { UserDTO, updateUserServiceType };
