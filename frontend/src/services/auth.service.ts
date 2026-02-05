import UserDTO from "../dto/user/user.dto";
import { loginSchemaType } from "../schemas/loginSchema";
import apiPublic from "./publicApi";

export async function loginUser(data: loginSchemaType) {
  const response = await apiPublic.post<UserDTO>("/login", data);
  return response;
}
