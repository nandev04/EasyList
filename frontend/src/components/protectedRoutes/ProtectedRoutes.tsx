import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";
import useDelayLoading from "../../hooks/React/useDelayLoading";
import { useGetUser } from "../../hooks/React/useUser";

const ProtectedRoutes = () => {
  const { data, isLoading } = useGetUser();

  const { showLoading } = useDelayLoading(isLoading, 200);

  if (isLoading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (!showLoading && !data) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
