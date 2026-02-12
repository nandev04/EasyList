export enum StatusTask {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

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
export type { GetTaskResponse, CreateTaskPayload };
