import { useEffect } from "react";
import MainRoutes from "./routes";
import { useUserStore } from "./store/userSession.store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <MainRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
