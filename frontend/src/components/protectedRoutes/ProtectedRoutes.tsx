import { useUserStore } from "../../store/userSession.store";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
import useDelayLoading from "../../hooks/useDelayLoading";

const ProtectedRoutes = () => {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const { showLoading } = useDelayLoading(loading, 200);

  if (loading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (!showLoading && !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
