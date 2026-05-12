type UserDTO = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  signedUrlAvatar: string | null;
};

export type { UserDTO };
