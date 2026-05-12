import {
  taskSchemaType,
  GetTaskQueryParams,
  getTaskQuerySchema,
} from "../schema/task.schema";
import { EditTaskPayload, GetTaskResponse } from "../types/task.types";
import { privateApi } from "../../../shared/services/axiosApi";

export async function getTasks(
  params: GetTaskQueryParams,
): Promise<GetTaskResponse> {
  const validated = getTaskQuerySchema.parse(params);
  const urlSearchParams = new URLSearchParams(
    Object.entries(validated)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );
  const response = await privateApi.get(`/tasks?${urlSearchParams}`);
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
