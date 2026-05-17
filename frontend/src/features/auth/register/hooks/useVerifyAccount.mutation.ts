import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../../services/auth.service";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useVerifyAccountMutation = () => {
  return useMutation({
    mutationFn: (token: string) => verifyAccount({ token }),
    onSuccess: () => {
      toast.success("Conta verificada com sucesso!");
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

export { useVerifyAccountMutation };
