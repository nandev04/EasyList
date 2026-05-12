import { otpSchemaType } from "../../../shared/schema/otpCode.schema";
import { privateApi } from "../../../shared/services/axiosApi";
import { UserDTO } from "../../../shared/types/user.dto";

export async function getUser() {
  const user = await privateApi.get<UserDTO>("/user");
  return {
    ...user.data,
    firstName: user.data.username.split(" ")[0],
  };
}

type UpdateUserBodyType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
};
export async function updateUser(data: UpdateUserBodyType) {
  const response = await privateApi.patch("/user", data);
  return response;
}

export async function updateAvatar(formData: FormData) {
  const response = await privateApi.patch("/avatar/upload", formData);
  return response;
}

export async function verifyOtpEmailUpdate(data: otpSchemaType) {
  const response = await privateApi.post("/email-change/verify", data);
  return response;
}
