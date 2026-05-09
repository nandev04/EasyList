import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar, updateUser } from "../../services/user.service";
import toast from "react-hot-toast";

const queryClient = useQueryClient();

const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

const useUpdateAvatar = () =>
  useMutation({
    mutationFn: (formData: FormData) => updateAvatar(formData),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["user"] }),
        toast.success("Avatar atualizado !"));
    },
  });

export { useUpdateUserMutation, useUpdateAvatar };
