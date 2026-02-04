import axios from "axios";

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export default apiPublic;
