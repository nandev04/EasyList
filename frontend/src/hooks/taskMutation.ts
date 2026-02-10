import { useMutation } from "@tanstack/react-query";
import { getTasks } from "../services/task.service";
import { queryClient } from "../lib/reactQuery";

export const taskMutation = {
  createTask: useMutation({
    mutationFn: getTasks,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  }),
};
