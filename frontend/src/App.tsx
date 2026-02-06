import { useEffect } from "react";
import MainRoutes from "./routes";
import { useUserStore } from "./store/userSession.store";

export default function App() {
  const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return <MainRoutes />;
}
