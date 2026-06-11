import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth.service";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["user"] });
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
};

export { useLogoutMutation };
