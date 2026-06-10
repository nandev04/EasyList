import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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
    getNextPageParam: (lastPage) =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });

const useCreateTaskMutation = () =>
  useMutation({
    mutationFn: createTask,
  });

const useEditTaskMutation = () =>
  useMutation({
    mutationFn: editTask,
  });

const useDeleteTaskMutation = () =>
  useMutation({
    mutationFn: deleteTask,
  });

export {
  useGetTasks,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
};
