import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepEmail from "../components/StepEmail";
import { useForgotPasswordStore } from "../store/useForgotPassword.store";

const ForgotPasswordEmailPage = () => {
  const navigate = useNavigate();
  const { email, resetToken, setEmail } = useForgotPasswordStore();

  useEffect(() => {
    if (email && resetToken)
      navigate("/forgot-password/reset", { replace: true });
    else if (email) navigate("/forgot-password/otp", { replace: true });
  }, []);

  return (
    <StepEmail
      initialEmail={email}
      onSuccess={(newEmail) => {
        setEmail(newEmail);
        navigate("/forgot-password/otp");
      }}
    />
  );
};

export default ForgotPasswordEmailPage;
