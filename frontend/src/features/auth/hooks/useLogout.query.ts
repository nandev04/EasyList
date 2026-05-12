import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth.service";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => await logoutUser(),
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });
};

export { useLogoutMutation };
