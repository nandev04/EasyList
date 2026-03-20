import axios from "axios";
import { useUserStore } from "../store/userSession.store";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export function setupInterceptors() {
  const logout = useUserStore.getState().logout;
  privateApi.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        logout();
      }

      const message = err.response?.data?.message || "Erro inesperado";
      return Promise.reject(new Error(message));
    },
  );
}
