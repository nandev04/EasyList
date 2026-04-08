import { create } from "zustand";
import { UserDTO } from "../types/user.types";
import { loadUser } from "../services/user.service";
import { logoutUser } from "../services/auth.service";

type UserStoreType = {
  user: UserDTO | null;
  loading: boolean;
  logout: () => void;
  setUser: (user: UserDTO) => void;
  updateUser: (user: Partial<UserDTO>) => void;
  loadUser: () => void;
};

export const useUserStore = create<UserStoreType>()((set) => ({
  user: null,
  loading: true,
  logout: async () => {
    try {
      set({ loading: true });
      await logoutUser();
      set({ user: null });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  setUser: (user: UserDTO | null) => set({ user }),
  updateUser: (user) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    })),
  loadUser: async () => {
    try {
      set({ loading: true });
      const data = await loadUser();
      set({ user: data });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
