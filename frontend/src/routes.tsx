import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import { setupInterceptors } from "./services/privateApi";

function MainRoutes() {
  const navigate = useNavigate();

  setupInterceptors(navigate);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MainRoutes;
