import { useForgotPasswordStore } from "../store/useForgotPassword.store";
import StepResetPassword from "../components/StepResetPassword";
import { useNavigate } from "react-router-dom";

const FPResetPage = () => {
  const navigate = useNavigate();
  const { resetToken, clear } = useForgotPasswordStore();

  return (
    <StepResetPassword
      resetToken={resetToken}
      onSuccess={() => navigate("/forgot-password/success")}
      onBack={() => navigate("/forgot-password")}
      onExpired={() => {
        clear();
        navigate("/forgot-password", { replace: true });
      }}
    />
  );
};

export default FPResetPage;
