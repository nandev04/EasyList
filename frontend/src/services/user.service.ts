import { privateApi } from "./privateApi";

export async function getUser() {
  const user = await privateApi.get("/user");
  return user.data;
}
