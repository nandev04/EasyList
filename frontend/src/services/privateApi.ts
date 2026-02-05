import axios from "axios";
import { useUserStore } from "../store/userSession.store";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export function setupInterceptors() {
  const { logout } = useUserStore();
  privateApi.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        logout();
      }
      return Promise.reject(err);
    },
  );
}
