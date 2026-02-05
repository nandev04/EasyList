import { privateApi } from "./privateApi";

export async function loadUser() {
  const user = await privateApi.get("/user");
  return user.data;
}
