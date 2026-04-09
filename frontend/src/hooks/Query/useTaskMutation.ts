import { useMutation } from "@tanstack/react-query";
import { createTask, deleteTask, editTask } from "../../services/task.service";
import { queryClient } from "../../lib/reactQuery";

const useCreateTaskMutation = () =>
  useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

const useEditTaskMutation = () =>
  useMutation({
    mutationFn: editTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

const useDeleteTaskMutation = () =>
  useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

export { useCreateTaskMutation, useEditTaskMutation, useDeleteTaskMutation };
