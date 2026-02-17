import UserDTO from "../types/user.types";
import { loginSchemaType } from "../schemas/loginSchema";
import apiPublic from "./publicApi";

export async function loginUser(data: loginSchemaType): Promise<void> {
  await apiPublic.post<UserDTO>("/login", data);
}
