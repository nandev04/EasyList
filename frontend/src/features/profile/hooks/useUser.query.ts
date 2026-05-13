import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateAvatar, updateUser } from "../services/user.service";
import toast from "react-hot-toast";
import { updateUserSchemaType } from "../schema/updateUserSchema";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    retry: false,
  });

export { useGetUser };

const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: updateUserSchemaType) => updateUser(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateAvatar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Avatar atualizado !");
    },
  });
};

export { useUpdateUserMutation, useUpdateAvatarMutation };
