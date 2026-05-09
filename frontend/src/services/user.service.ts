import { otpSchemaType } from "../schemas/EmailOtp.schema";
import {
  CreateUserBodyType,
  CreateUserResponseType,
  UpdateUserBodyType,
  UserDTO,
} from "../shared/types/user.types";
import { privateApi } from "./api";

export async function createUser(formData: CreateUserBodyType) {
  const createUser = await privateApi.post<CreateUserResponseType>(
    "/user",
    formData,
  );
  return createUser;
}

export async function getUser() {
  const user = await privateApi.get<UserDTO>("/user");
  return {
    ...user.data,
    firstName: user.data.username.split(" ")[0],
  };
}

export async function updateAvatar(formData: FormData) {
  const response = await privateApi.patch("/avatar/upload", formData);
  return response;
}

export async function updateUser(data: UpdateUserBodyType) {
  const response = await privateApi.patch("/user", data);
  return response;
}

export async function verifyOtpEmailUpdate(data: otpSchemaType) {
  const response = await privateApi.post("/email-change/verify", data);
  return response;
}
