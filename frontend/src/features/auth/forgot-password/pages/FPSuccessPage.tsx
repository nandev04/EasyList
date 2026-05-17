import { useEffect } from "react";
import StepPasswordSuccess from "../components/StepSuccess";
import { useForgotPasswordStore } from "../store/useForgotPassword.store";
import PageFlowTransition from "../../../../shared/components/ui/PageFlowTransition";

const FPSuccessPage = () => {
  const { clear } = useForgotPasswordStore();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <PageFlowTransition>
      <StepPasswordSuccess />
    </PageFlowTransition>
  );
};

export default FPSuccessPage;
