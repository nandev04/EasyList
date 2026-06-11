import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "./ui/LoadingScreen";
import { useUserStore } from "../store/useUserStore";
import useBfGuard from "../hooks/useBfGuard";

const ProtectedRoutes = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  useBfGuard();

  if (isLoading) return <LoadingScreen />;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
