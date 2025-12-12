// interface TaskType {
//   title: string;
//   description?: string;
//   userId: number;
//   date?: string;
//   status?: taskStatus;
// }

interface CreateTaskType {
  userId: number;
  title: string;
  description?: string | null | undefined;
  status?: taskStatus;
}

enum taskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export { taskStatus, CreateTaskType };
