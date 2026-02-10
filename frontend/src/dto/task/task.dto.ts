type TaskDTO = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default TaskDTO;
