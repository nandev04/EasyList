import loginDTO from "../dto/user/loginDTO";
import apiPublic from "./publicApi";

export async function loginUser(data: loginDTO) {
  return await apiPublic.post("/login", data);
}
