import { useEffect } from "react";
import StepPasswordSuccess from "../../../components/features/forgot-password/stepPasswordSuccess/stepPasswordSuccess";
import { useForgotPasswordStore } from "../../../features/auth/forgot-password/store/useForgotPassword.store";

const ForgotPasswordSuccessPage = () => {
  const { clear } = useForgotPasswordStore();

  useEffect(() => {
    clear();
  }, []);

  return <StepPasswordSuccess />;
};

export default ForgotPasswordSuccessPage;
