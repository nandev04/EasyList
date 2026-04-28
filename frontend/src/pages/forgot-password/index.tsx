import styles from "./forgotPassword.module.css";
import ComponentEmailInput from "../../components/componentEmailInput/ComponentEmailInput";
import ComponentOtp from "../../components/componentOtp/ComponentOtp";

const ForgotPassword = () => {
  const showOtp = true;

  return (
    <>
      <span className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          {showOtp ? <ComponentOtp /> : <ComponentEmailInput />}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
