import MainRoutes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <MainRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
