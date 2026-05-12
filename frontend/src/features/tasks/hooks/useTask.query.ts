import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "../services/task.service";
import { GetTaskQueryParams } from "../schema/task.schema";

const useGetTasks = (user: boolean, params: GetTaskQueryParams) =>
  useInfiniteQuery({
    queryKey: ["tasks", params],
    queryFn: ({ pageParam }) =>
      getTasks({ ...params, cursor: pageParam || undefined }),
    enabled: !!user,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor ?? undefined,
  });

const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

const useEditTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export {
  useGetTasks,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
};
