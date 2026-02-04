import { loginSchemaType } from "../schemas/loginSchema";
import apiPublic from "./publicApi";

export async function loginUser(data: loginSchemaType) {
  return await apiPublic.post("/login", data);
}
