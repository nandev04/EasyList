import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userSession.store";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../loading/Loading";

const ProtectedRoutes = () => {
  const { user, loading } = useUserStore();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (loading) {
      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, 200);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [loading]);

  if (loading && !showLoading) return null;

  if (showLoading) return <Loading />;

  if (!loading && !user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
