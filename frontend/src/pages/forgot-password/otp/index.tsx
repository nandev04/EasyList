import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepOtp from "../../../components/features/forgot-password/stepOtp/stepOtp";
import { useForgotPasswordStore } from "../../../store/useForgotPasswordStore";

const ForgotPasswordOtpPage = () => {
  const navigate = useNavigate();
  const { email, resetToken, setResetToken, clear } = useForgotPasswordStore();

  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
    if (resetToken) navigate("/forgot-password/reset", { replace: true });
  }, []);

  return (
    <StepOtp
      email={email}
      onSuccess={(token) => {
        setResetToken(token);
        navigate("/forgot-password/reset");
      }}
      onBack={() => navigate("/forgot-password")}
      onExpired={() => {
        clear();
        navigate("/forgot-password", { replace: true });
      }}
    />
  );
};

export default ForgotPasswordOtpPage;
