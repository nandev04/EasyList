export enum StatusTask {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

type TaskDTO = {
  id: number;
  title: string;
  description: string | null;
  status: StatusTask;
  createdAt: Date;
  updatedAt: Date;
};

export type { TaskDTO };
