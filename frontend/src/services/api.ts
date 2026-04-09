import axios from "axios";
import { logoutUser } from "./auth.service";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isInterceptorSet = false;
export function setupInterceptors() {
  if (isInterceptorSet) return;
  isInterceptorSet = true;

  privateApi.interceptors.response.use(
    (res) => res,
    (err) => {
      const isSessionCheck = err.config?.url === "/user";

      if (err.response?.status === 401 && !isSessionCheck) {
        logoutUser();
      }

      err.message = err.response?.data?.message || "Erro inesperado";

      return Promise.reject(err);
    },
  );
}

setupInterceptors();
