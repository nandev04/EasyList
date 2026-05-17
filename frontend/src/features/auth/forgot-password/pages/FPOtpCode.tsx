import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepOtp from "../components/StepOtp";
import { useForgotPasswordStore } from "../store/useForgotPassword.store";
import PageFlowTransition from "../../../../shared/components/ui/PageFlowTransition";

const OtpCodePage = () => {
  const navigate = useNavigate();
  const { email, resetToken, setResetToken, clear, setEmail } =
    useForgotPasswordStore();

  useEffect(() => {
    if (!email) navigate("/forgot-password", { replace: true });
    if (resetToken) navigate("/forgot-password/reset", { replace: true });
  }, [email, navigate, resetToken]);

  return (
    <PageFlowTransition>
      <StepOtp
        email={email}
        onSuccess={(token) => {
          setResetToken(token);
          navigate("/forgot-password/reset");
        }}
        onBack={() => {
          setEmail("");
          navigate("/forgot-password", { replace: true });
        }}
        onExpired={() => {
          clear();
          navigate("/forgot-password", { replace: true });
        }}
      />
    </PageFlowTransition>
  );
};

export default OtpCodePage;
