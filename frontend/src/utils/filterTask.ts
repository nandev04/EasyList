import { GetTaskResponse, StatusTask } from "../types/task.types";

function filterTask<T extends GetTaskResponse>(
  data: Array<T>,
  status: StatusTask,
) {
  return data.filter((data) => data.status === status);
}

export default filterTask;
