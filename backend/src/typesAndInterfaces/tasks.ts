interface TaskType {
  title: string;
  description?: string;
  accessToken: string;
  date?: string;
  status?: taskStatus;
}

interface TaskModelInput {
  id: number;
  title: string;
  description: string;
  dateUTC: string;
  status?: taskStatus;
}

enum taskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export { TaskType, taskStatus, TaskModelInput };
