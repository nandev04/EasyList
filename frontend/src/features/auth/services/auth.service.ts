import { UserDTO } from "../../../types/user.types.ts";
import { loginSchemaType } from "../login/schema/login.schema.ts";
import { privateApi, publicApi } from "../../../services/api.ts";
import { changePasswordSchemaType } from "../../../components/DialogChangePassword/change-password.schema.ts";
import { verifyAccountType } from "../../../types/auth.types.ts";
import { emailVerifySchemaType } from "../../../schemas/sendEmailVerify.schema.ts";
import { emailForgotPwdSchemaType } from "../../../schemas/emailForgotPwd.ts";
import { verifyOtpForgotPwdSchemaType } from "../../../schemas/verifyOtpForgotPwd.ts";
import { newPasswordForgotSchemaType } from "../../../schemas/newPasswordForgot.ts";

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

export async function sendEmailForgotPassword(body: emailForgotPwdSchemaType) {
  return await publicApi.post(`${BASE_ENDPOINT}/forgot-password`, body);
}

export async function sendOtpForgotPassword(
  body: verifyOtpForgotPwdSchemaType,
) {
  return await publicApi.post(`${BASE_ENDPOINT}/verify-code`, body);
}

type sendNewPasswordForgotType = Omit<
  newPasswordForgotSchemaType,
  "confirmPassword"
> & {
  tokenResetPassword: string;
};
export async function sendNewPasswordForgot(body: sendNewPasswordForgotType) {
  return await publicApi.post(`${BASE_ENDPOINT}/reset-password`, body);
}
