import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  verifyAccount,
} from "../../features/auth/services/auth.service";
import toast from "react-hot-toast";
import { queryClient } from "../../lib/reactQuery";
import { AxiosError } from "axios";

const useLogoutMutation = () => {
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
