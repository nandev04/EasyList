import { useEffect } from "react";
import StepPasswordSuccess from "../../../components/features/forgot-password/stepPasswordSuccess/stepPasswordSuccess";
import { useForgotPasswordStore } from "../../../store/useForgotPasswordStore";

const ForgotPasswordSuccessPage = () => {
  const { clear } = useForgotPasswordStore();

  useEffect(() => {
    clear();
  }, []);

  return <StepPasswordSuccess />;
};

export default ForgotPasswordSuccessPage;
