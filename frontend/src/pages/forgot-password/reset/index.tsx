import { useNavigate } from "react-router-dom";
import StepResetPassword from "../../../components/features/forgot-password/stepResetPassword/StepResetPassword";
import { useForgotPasswordStore } from "../../../store/useForgotPasswordStore";

const ForgotPasswordResetPage = () => {
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

export default ForgotPasswordResetPage;
