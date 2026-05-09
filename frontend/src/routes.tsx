import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/auth/login/pages/LoginPage";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import PublicRoutes from "./components/publicRoutes/PublicRoutes";
import Profile from "./pages/profile";
import Register from "./features/auth/register/pages/RegisterPage";
import VerifyAccount from "./features/auth/register/pages/VerifyAccountPage";
import VerifyEmail from "./features/auth/register/pages/RequestVerificationPage";
import ForgotPasswordLayout from "./pages/forgot-password";
import ForgotPasswordEmailPage from "./pages/forgot-password/email";
import ForgotPasswordOtpPage from "./pages/forgot-password/otp";
import ForgotPasswordResetPage from "./pages/forgot-password/reset";
import ForgotPasswordSuccessPage from "./pages/forgot-password/success";

function MainRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPasswordLayout />}>
          <Route index element={<ForgotPasswordEmailPage />} />
          <Route path="otp" element={<ForgotPasswordOtpPage />} />
          <Route path="reset" element={<ForgotPasswordResetPage />} />
          <Route path="success" element={<ForgotPasswordSuccessPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
