import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/task.service";
import { GetTaskQueryParams } from "../../schemas/taskSchema";

const useTasks = (user: boolean, params: GetTaskQueryParams) =>
  useInfiniteQuery({
    queryKey: ["tasks", params],
    queryFn: ({ pageParam }) =>
      getTasks({ ...params, cursor: pageParam || undefined }),
    enabled: !!user,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
  });

export default useTasks;
