import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import { setupInterceptors } from "./services/api";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import { useUserStore } from "./store/userSession.store";
import { useEffect } from "react";

function MainRoutes() {
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
    setupInterceptors();
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MainRoutes;
