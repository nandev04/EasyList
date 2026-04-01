import { UserDTO } from "../types/user.types.ts";
import { loginSchemaType } from "../schemas/loginSchema";
import { privateApi, publicApi } from "./api";
import { changePasswordSchemaType } from "../components/DialogChangePassword/change-password.schema.ts";

export async function loginUser(data: loginSchemaType) {
  await publicApi.post<UserDTO>("/auth/login", data);
}

export async function changePassword(data: changePasswordSchemaType) {
  return await privateApi.patch("/auth/change-password", data);
}
