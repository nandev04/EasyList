import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user.service";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../Query/useUserMutation";

const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    retry: false,
  });

const useCreateUser = () => useCreateUserMutation();

const useUpdateUser = () => useUpdateUserMutation();

export { useGetUser, useCreateUser, useUpdateUser };
