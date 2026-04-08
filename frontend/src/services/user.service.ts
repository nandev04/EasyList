import { emailOtpSchemaType } from "../schemas/EmailOtp.schema";
import { UpdateUserType, UserDTO } from "../types/user.types";
import { privateApi } from "./api";

export async function loadUser() {
  const user = await privateApi.get<UserDTO>("/user");
  return {
    ...user.data,
    firstName: user.data.username.split(" ")[0],
  };
}

export async function updateAvatar(formData: FormData) {
  const response = await privateApi.post("/avatar/upload", formData);
  return response;
}

export async function updateUser(data: UpdateUserType) {
  const response = await privateApi.patch("/user", data);
  return response;
}

export async function verifyOtpEmailUpdate(data: emailOtpSchemaType) {
  const response = await privateApi.post("/email-change/verify", data);
  return response;
}
