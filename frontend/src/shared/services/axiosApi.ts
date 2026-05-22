import axios from "axios";
import { logoutUser } from "../../features/auth/services/auth.service";

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
      const url: string = err.config?.url ?? "";
      const skipLogout =
        url.endsWith("/v1/user") || url.endsWith("/v1/auth/logout");

      if (err.response?.status === 401 && !skipLogout) {
        logoutUser();
      }

      err.message = err.response?.data?.message || "Erro inesperado";

      return Promise.reject(err);
    },
  );

  publicApi.interceptors.response.use(
    (res) => res,
    (err) => {
      err.message =
        err.response.status === 429
          ? "Ocorreu muitas tentativas, tente novamente mais tarde"
          : err.response?.data?.message || "Erro inesperado";
      return Promise.reject(err);
    },
  );
}

setupInterceptors();
