import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { logoutUser, verifyAccount } from "../../services/auth.service";
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

const useVerifyAccountMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => verifyAccount({ token }),
    onSuccess: () => {
      (toast.success("Conta verificada com sucesso!"), navigate("/login"));
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 429) {
          toast.error("Muitas tentativas, tente novamente mais tarde");
          return;
        }
      }
      toast.error("Token inválido ou expirado");
      return;
    },
  });
};

export { useLogoutMutation, useVerifyAccountMutation };
