import UserDTO from "../types/user.types";
import { privateApi } from "./api";

export async function loadUser() {
  const user = await privateApi.get<UserDTO>("/user");
  return {
    ...user.data,
    firstName: user.data.username.split(" ")[0],
  };
}

export async function logoutUser() {
  const response = await privateApi.post("/logout");
  return response;
}

export async function updateAvatar(formData: FormData) {
  const response = await privateApi.post("/avatar/upload", formData);
  return response;
}
