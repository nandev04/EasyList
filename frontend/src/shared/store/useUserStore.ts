import { create } from "zustand";
import { UserDTO } from "../types/user.types";

type UserStore = {
  user: UserDTO | null;
  isLoading: boolean;
  setUser: (user: UserDTO | null) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
