import { TaskDTO } from "../dto/task/task.dto";
import { privateApi } from "./privateApi";

export async function getTasks(): Promise<TaskDTO[]> {
  const response = await privateApi.get("/tasks");
  return response.data;
}
