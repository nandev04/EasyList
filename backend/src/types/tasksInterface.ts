interface TaskType {
  title: string;
  description: string;
  id: string;
  status: taskStatus;
}

enum taskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export { TaskType, taskStatus };
