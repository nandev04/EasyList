import {
  createTaskSchemaType,
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
  const response = await privateApi.get<GetTaskResponse>(
    `/v1/tasks?${urlSearchParams}`,
  );
  return response.data;
}

export async function createTask(data: createTaskSchemaType) {
  const response = await privateApi.post("/v1/tasks", data);
  return response;
}

export async function editTask({
  taskId,
  data,
}: {
  taskId: number;
  data: EditTaskPayload;
}) {
  const response = await privateApi.patch(`/v1/tasks/${taskId}`, data);
  return response;
}

export async function deleteTask(taskId: number) {
  const response = await privateApi.delete(`/v1/tasks/${taskId}`);
  return response;
}
