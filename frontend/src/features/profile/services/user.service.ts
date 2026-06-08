import { otpSchemaType } from "../../../shared/schema/otpCode.schema";
import { privateApi } from "../../../shared/services/axiosApi";
import { ApiResponse } from "../../../shared/types/apiResponse.dto";
import { UserDTO } from "../../../shared/types/user.dto";
import { registerSchemaType } from "../../auth/register/schema/register.schema";

export async function getUser(): Promise<UserDTO> {
  const response = await privateApi.get<ApiResponse<UserDTO>>("/v1/user");
  return response.data.data;
}

export async function createUser(formData: registerSchemaType) {
  const createUser = await privateApi.post<registerSchemaType>(
    "/v1/user",
    formData,
  );
  return createUser;
}

type UpdateUserBodyType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};
export async function updateUser(data: UpdateUserBodyType) {
  const response = await privateApi.patch("/v1/user", data);
  return response;
}

export async function updateAvatar(formData: FormData) {
  const response = await privateApi.patch("/v1/avatar/upload", formData);
  return response;
}

export async function verifyOtpEmailUpdate(data: otpSchemaType) {
  const response = await privateApi.post("/v1/email-change/verify", data);
  return response;
}
