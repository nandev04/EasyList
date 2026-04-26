import MainRoutes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import useUserSync from "./hooks/React/useUserSync";

export default function App() {
  useUserSync();

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <MainRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
