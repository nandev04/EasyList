import { Navigate, Outlet } from "react-router-dom";
import Loading from "./ui/LoadingScreen";
import useDelayLoading from "../hooks/useDelayLoading";
import { useUserStore } from "../store/useUserStore";

const ProtectedRoutes = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  const { showLoading } = useDelayLoading(isLoading, 200);

  if (isLoading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (!showLoading && !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
