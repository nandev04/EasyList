import { registerSchemaType } from "../../features/auth/register/schema/register.schema";

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

type CreateUserResponseType = { message: string };

type UpdateUserBodyType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};

export type { UserDTO, CreateUserResponseType, UpdateUserBodyType };
