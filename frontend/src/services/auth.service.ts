import UserDTO from "../types/user.types";
import { loginSchemaType } from "../schemas/loginSchema";
import { publicApi } from "./api";

export async function loginUser(data: loginSchemaType): Promise<void> {
  await publicApi.post<UserDTO>("/login", data);
}
