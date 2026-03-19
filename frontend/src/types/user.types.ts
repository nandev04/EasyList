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

type UpdateUserType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};

export type { UserDTO, UpdateUserType };
