import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { logoutUser, verifyAccount } from "../../services/auth.service";
import toast from "react-hot-toast";
import { queryClient } from "../../lib/reactQuery";

const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
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
    onError: () => {
      toast.error("Token inválido ou expirado");
    },
  });
};

export { useLogoutMutation, useVerifyAccountMutation };
