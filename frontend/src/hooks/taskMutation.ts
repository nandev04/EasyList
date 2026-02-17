import { useMutation } from "@tanstack/react-query";
import { createTask, deleteTask, editTask } from "../services/task.service";
import { queryClient } from "../lib/reactQuery";

const useCreateTask = () =>
  useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

const useEditTask = () =>
  useMutation({
    mutationFn: editTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
const useDeleteTask = () =>
  useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

export { useCreateTask, useEditTask, useDeleteTask };
