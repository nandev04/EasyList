import { Navigate, Outlet } from "react-router-dom";
import Loading from "./ui/LoadingScreen";
import { useUserStore } from "../store/useUserStore";

const PublicRoutes = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  if (isLoading) return <Loading />;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicRoutes;
