import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "../../services/user.service";
import { queryClient } from "../../lib/reactQuery";
import toast from "react-hot-toast";
import { CreateUserBodyType } from "../../types/user.types";

const useCreateUserMutation = () =>
  useMutation({
    mutationFn: (data: CreateUserBodyType) => createUser(data),
    onSuccess: () => {
      toast.success(
        "Conta criada com sucesso, verifique o email registrado para confirmar sua conta!",
      );
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar a conta");
    },
  });

const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

export { useCreateUserMutation, useUpdateUserMutation };
