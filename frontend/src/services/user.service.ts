import UserDTO from "../dto/user/user.dto";
import { privateApi } from "./privateApi";

export async function loadUser() {
  const user = await privateApi.get<UserDTO>("/user");
  return {
    ...user.data,
    firstName: user.data.username.split(" ")[0],
  };
}
