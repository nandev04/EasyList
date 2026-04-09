import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/task.service";

const useTasks = (user: boolean) =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: !!user,
  });

export default useTasks;
