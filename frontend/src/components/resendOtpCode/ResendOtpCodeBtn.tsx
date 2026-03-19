import { MouseEventHandler, ReactNode } from "react";
import styles from "./resendOtpCodeBtn.module.css";

const ResendOtpCodeBtn = ({
  children,
  callback,
}: {
  children: ReactNode;
  callback: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <p className={styles.resend_description}>
      Não recebeu o código?{" "}
      <button type="button" onClick={callback} className={styles.resend_btn}>
        {children}
      </button>
    </p>
  );
};

export default ResendOtpCodeBtn;
