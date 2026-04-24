import { UserDTO } from "../types/user.types.ts";
import { loginSchemaType } from "../schemas/loginSchema";
import { privateApi, publicApi } from "./api";
import { changePasswordSchemaType } from "../components/DialogChangePassword/change-password.schema.ts";
import { verifyAccountType } from "../types/auth.types.ts";
import { emailVerifySchemaType } from "../schemas/sendEmailVerify.schema.ts";

const BASE_ENDPOINT = "/auth";

export async function loginUser(body: loginSchemaType) {
  await publicApi.post<UserDTO>(`${BASE_ENDPOINT}/login`, body);
}

export async function logoutUser() {
  const response = await privateApi.post(`${BASE_ENDPOINT}/logout`);
  return response;
}

export async function changePassword(body: changePasswordSchemaType) {
  return await privateApi.patch(`${BASE_ENDPOINT}/change-password`, body);
}

export async function verifyAccount(body: verifyAccountType) {
  return await privateApi.patch(`${BASE_ENDPOINT}/verify`, body);
}

export async function resendLinkVerifyAccount(body: emailVerifySchemaType) {
  return await privateApi.post(`${BASE_ENDPOINT}/verify/resend`, body);
}
