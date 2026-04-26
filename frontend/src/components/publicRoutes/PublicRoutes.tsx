import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
import useDelayLoading from "../../hooks/React/useDelayLoading";
import { useUserStore } from "../../store/useUserStore";

const PublicRoutes = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  const { showLoading } = useDelayLoading(isLoading, 200);

  if (isLoading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicRoutes;
