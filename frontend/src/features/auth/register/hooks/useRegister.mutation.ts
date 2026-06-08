import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { registerSchemaType } from "../schema/register.schema";
import { createUser } from "../../../profile/services/user.service";

const useCreateUserMutation = () =>
  useMutation({
    mutationFn: (data: registerSchemaType) => createUser(data),
    onSuccess: () => {
      toast.success(
        "Conta criada com sucesso, verifique o email registrado para confirmar sua conta!",
      );
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar a conta");
    },
  });

export { useCreateUserMutation };
