import { create } from "zustand";
import UserDTO from "../dto/user/user.dto";
import { loadUser } from "../services/user.service";

type UserStoreType = {
  user: UserDTO | null;
  loading: boolean;
  logout: () => void;
  loadUser: () => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  loading: true,
  logout: () => set({ user: null }),
  loadUser: async () => {
    try {
      const data = await loadUser();
      set({ user: data });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
