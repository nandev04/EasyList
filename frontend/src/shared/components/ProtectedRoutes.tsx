import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "./ui/LoadingScreen";
import { useUserStore } from "../store/useUserStore";

const ProtectedRoutes = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  if (isLoading) return <LoadingScreen />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
