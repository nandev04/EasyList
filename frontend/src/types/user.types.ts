import { registerSchemaType } from "../schemas/register.schema";

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

type CreateUserBodyType = registerSchemaType;
type CreateUserResponseType = { message: string };

type UpdateUserBodyType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};

export type {
  UserDTO,
  CreateUserBodyType,
  CreateUserResponseType,
  UpdateUserBodyType,
};
