import { taskSchemaType } from "../schemas/taskSchema";
import { EditTaskPayload, GetTaskResponse } from "../types/task.types";
import { privateApi } from "./api";

export async function getTasks(): Promise<GetTaskResponse[]> {
  const response = await privateApi.get("/tasks");
  return response.data;
}

export async function createTask(data: taskSchemaType) {
  const response = await privateApi.post("/tasks", data);
  return response;
}

export async function editTask({
  taskId,
  data,
}: {
  taskId: number;
  data: EditTaskPayload;
}) {
  const response = await privateApi.patch(`/tasks/${taskId}`, data);
  return response;
}

export async function deleteTask(taskId: number) {
  const response = await privateApi.delete(`/tasks/${taskId}`);
  return response;
}
