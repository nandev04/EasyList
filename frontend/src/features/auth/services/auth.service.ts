import { ApiResponse } from "../../../shared/types/apiResponse.dto.ts";
import { UserDTO } from "../../../shared/types/user.dto.ts";
import { loginSchemaType } from "../login/schema/login.schema.ts";
import { privateApi, publicApi } from "../../../shared/services/axiosApi.ts";
import { changePasswordSchemaType } from "../../profile/schema/changePassword.schema.ts";
import { newPasswordForgotSchemaType } from "../forgot-password/schema/newPassword.schema.ts";
import { emailValidateSchemaType } from "../../../shared/schema/email.schema.ts";
import { otpSchemaType } from "../../../shared/schema/otpCode.schema.ts";

const BASE_ENDPOINT = "/v1/auth";

export async function loginUser(body: loginSchemaType) {
  await publicApi.post<ApiResponse<UserDTO>>(`${BASE_ENDPOINT}/login`, body);
}

export async function logoutUser() {
  const response = await publicApi.post(`${BASE_ENDPOINT}/logout`);
  return response;
}

export async function changePassword(body: changePasswordSchemaType) {
  return await privateApi.patch(`${BASE_ENDPOINT}/change-password`, body);
}

export type verifyAccountType = { token: string };
export async function verifyAccount(body: verifyAccountType) {
  return await privateApi.patch(`${BASE_ENDPOINT}/verify`, body);
}

export async function resendLinkVerifyAccount(body: emailValidateSchemaType) {
  return await privateApi.post(`${BASE_ENDPOINT}/verify/resend`, body);
}

export async function sendEmailForgotPassword(body: emailValidateSchemaType) {
  return await publicApi.post(`${BASE_ENDPOINT}/forgot-password`, body);
}

export async function sendOtpForgotPassword(
  body: otpSchemaType & emailValidateSchemaType,
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
