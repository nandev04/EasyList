import { taskSchemaType } from "../schemas/taskSchema";
import { GetTaskResponse } from "../types/task.types";
import { privateApi } from "./privateApi";

export async function getTasks(): Promise<GetTaskResponse[]> {
  const response = await privateApi.get("/tasks");
  return response.data;
}

export async function createTask(data: taskSchemaType) {
  const response = await privateApi.post("/tasks", data);
  return response;
}
