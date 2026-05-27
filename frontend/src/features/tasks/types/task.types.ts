import type { ApiResponse } from "../../../shared/types/apiResponse.dto";
import type {
  createTaskSchemaType,
  editTaskSchemaType,
} from "../schema/task.schema";

export enum StatusTask {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

type OptionsStatusTask = {
  name: string;
  value: keyof typeof StatusTask;
};

type Task = {
  id: number;
  title: string;
  description: string | undefined;
  status: StatusTask;
  createdAt: Date;
  updatedAt: Date;
};

type GetTaskResponse = ApiResponse<{
  tasks: Task[];
  pagination: {
    nextCursor: null;
    hasNextPage: number | null;
  };
}>;

type CreateTaskPayload = createTaskSchemaType;

type EditTaskPayload = editTaskSchemaType;

export type {
  GetTaskResponse,
  CreateTaskPayload,
  OptionsStatusTask,
  EditTaskPayload,
};
