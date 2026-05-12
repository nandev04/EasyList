import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/login/pages/LoginPage";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import PublicRoutes from "./shared/components/PublicRoutes";
import Home from "./features/tasks/pages/HomePage";
import Profile from "./features/profile/pages/ProfilePage";
import Register from "./features/auth/register/pages/RegisterPage";
import VerifyAccount from "./features/auth/register/pages/VerifyAccountPage";
import VerifyEmail from "./features/auth/register/pages/RequestVerificationPage";
import FPLayoutPage from "./features/auth/forgot-password/pages/FPLayouPage";
import FPEmailPage from "./features/auth/forgot-password/pages/FPEmailPage";
import FPOtpCodePage from "./features/auth/forgot-password/pages/FPOtpCode";
import FPResetPage from "./features/auth/forgot-password/pages/FPResetPage";
import FPSuccessPage from "./features/auth/forgot-password/pages/FPSuccessPage";

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
        <Route path="/forgot-password" element={<FPLayoutPage />}>
          <Route index element={<FPEmailPage />} />
          <Route path="otp" element={<FPOtpCodePage />} />
          <Route path="reset" element={<FPResetPage />} />
          <Route path="success" element={<FPSuccessPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
