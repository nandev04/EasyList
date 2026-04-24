import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Profile from "./pages/profile";
import Register from "./pages/register";
import VerifyAccount from "./pages/verify-account";
import VerifyEmail from "./pages/verify-email";

function MainRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MainRoutes;
