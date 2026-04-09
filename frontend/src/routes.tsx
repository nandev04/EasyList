import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Profile from "./pages/profile";
import Register from "./pages/register";
import VerifyAccount from "./pages/verify-account";

function MainRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MainRoutes;
