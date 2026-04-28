import { useState } from "react";
import styles from "./forgotPassword.module.css";
import ComponentEmailInput from "../../components/componentEmailInput/ComponentEmailInput";
import ComponentOtp from "../../components/componentOtp/ComponentOtp";
import ComponentResetPassword from "../../components/componentResetPassword/ComponentResetPassword";

type Step = "email" | "otp" | "reset";

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>("reset");

  return (
    <>
      <span className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          {step === "email" && <ComponentEmailInput />}
          {step === "otp" && <ComponentOtp />}
          {step === "reset" && <ComponentResetPassword />}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
