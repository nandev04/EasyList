interface createTaskType {
  title: string;
  description: string;
}

interface editTaskType extends createTaskType {
  status: string;
}

export { createTaskType, editTaskType };
