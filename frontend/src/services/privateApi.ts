//  Instanciar um objeto Axios, para ter um interceptors separado da ApiPublic

import axios from "axios";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export function setupInterceptors(navigate: (path: string) => void) {
  privateApi.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
      return Promise.reject(err);
    },
  );
}
