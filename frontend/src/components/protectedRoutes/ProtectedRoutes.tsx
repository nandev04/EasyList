import { useUserStore } from "../../store/userSession.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, loading } = useUserStore();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
