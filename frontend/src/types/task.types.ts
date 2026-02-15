export enum StatusTask {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

type OptionsStatusTask = {
  name: string;
  value: keyof typeof StatusTask;
};

type GetTaskResponse = {
  id: number;
  title: string;
  description: string | null;
  status: StatusTask;
  createdAt: Date;
  updatedAt: Date;
};

type CreateTaskPayload = {
  title: string;
  description: string;
  status: StatusTask;
};

type EditTaskPayload = CreateTaskPayload;

export type {
  GetTaskResponse,
  CreateTaskPayload,
  OptionsStatusTask,
  EditTaskPayload,
};
