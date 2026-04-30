import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ForgotPasswordStore = {
  email: string;
  resetToken: string;
  setEmail: (email: string) => void;
  setResetToken: (token: string) => void;
  clear: () => void;
};

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
  persist(
    (set) => ({
      email: "",
      resetToken: "",
      setEmail: (email) => set({ email }),
      setResetToken: (resetToken) => set({ resetToken }),
      clear: () => set({ email: "", resetToken: "" }),
    }),
    {
      name: "forgot-password",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
