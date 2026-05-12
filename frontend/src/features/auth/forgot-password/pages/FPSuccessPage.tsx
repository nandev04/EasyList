import { useEffect } from "react";
import StepPasswordSuccess from "../components/StepSuccess";
import { useForgotPasswordStore } from "../store/useForgotPassword.store";

const FPSuccessPage = () => {
  const { clear } = useForgotPasswordStore();

  useEffect(() => {
    clear();
  }, []);

  return <StepPasswordSuccess />;
};

export default FPSuccessPage;
