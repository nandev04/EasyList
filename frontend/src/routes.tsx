import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import { setupInterceptors } from "./services/privateApi";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import { useUserStore } from "./store/userSession.store";
import { useEffect } from "react";

function MainRoutes() {
  setupInterceptors();

  const { loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
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
