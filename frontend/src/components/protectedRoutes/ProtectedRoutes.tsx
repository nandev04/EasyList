import { useUserStore } from "../../store/userSession.store";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
import useDelayLoading from "../../hooks/useDelayLoading";

const ProtectedRoutes = () => {
  const { user, loading } = useUserStore();
  const { showLoading } = useDelayLoading(loading, 200);

  if (loading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (!loading && !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
