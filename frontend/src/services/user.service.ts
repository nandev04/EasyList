import UserDTO from "../types/user.types";
import { privateApi } from "./privateApi";

export async function loadUser() {
  const user = await privateApi.get<UserDTO>("/user");
  const avatarUrl = await privateApi.get<{ avatarUrl: string }>("/avatar");
  return {
    ...user.data,
    ...avatarUrl.data,
    firstName: user.data.username.split(" ")[0],
  };
}
