import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
import useDelayLoading from "../../shared/hooks/react/useDelayLoading";
import { useUserStore } from "../../shared/store/useUserStore";

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
