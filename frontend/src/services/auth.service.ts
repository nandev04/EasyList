import { UserDTO } from "../types/user.types.ts";
import { loginSchemaType } from "../schemas/loginSchema";
import { privateApi, publicApi } from "./api";
import { changePasswordSchemaType } from "../components/DialogChangePassword/change-password.schema.ts";
import { verifyAccountType } from "../types/auth.types.ts";
import { queryClient } from "../lib/reactQuery.ts";

export async function loginUser(body: loginSchemaType) {
  await publicApi.post<UserDTO>("/auth/login", body);
}

export async function logoutUser() {
  const response = await privateApi.post("auth/logout");
  queryClient.clear();
  window.location.href = "/login";
  return response;
}

export async function changePassword(body: changePasswordSchemaType) {
  return await privateApi.patch("/auth/change-password", body);
}

export async function verifyAccount(body: verifyAccountType) {
  return await privateApi.patch("/auth/verify", body);
}
