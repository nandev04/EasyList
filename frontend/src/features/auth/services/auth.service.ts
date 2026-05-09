import { UserDTO } from "../../../shared/types/user.types.ts";
import { loginSchemaType } from "../login/schema/login.schema.ts";
import { privateApi, publicApi } from "../../../shared/services/axiosApi.ts";
import { changePasswordSchemaType } from "../../profile/schema/changePassword.schema.ts";
import { verifyAccountType } from "../../../shared/types/auth.types.ts";
import { newPasswordForgotSchemaType } from "../forgot-password/schema/newPassword.schema.ts";
import { emailValidateSchemaType } from "../../../shared/schema/email.schema.ts";
import { otpSchemaType } from "../../../shared/schema/otpCode.schema.ts";
import { registerSchemaType } from "../register/schema/register.schema.ts";

const BASE_ENDPOINT = "/auth";

export async function createUser(formData: registerSchemaType) {
  const createUser = await privateApi.post<registerSchemaType>(
    "/user",
    formData,
  );
  return createUser;
}

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
