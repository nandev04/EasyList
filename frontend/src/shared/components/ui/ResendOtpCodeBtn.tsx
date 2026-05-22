import { ReactNode } from "react";
import styles from "./resendOtpCodeBtn.module.css";
import useDisableResend from "../../hooks/useDisableResend";

const COOLDOWN_SECONDS = 30;

const ResendOtpCodeBtn = ({
  children,
  callback,
}: {
  children: ReactNode;
  callback: () => void;
}) => {
  const { disabled, secondsLeft, setSecondsLeft } = useDisableResend();

  return (
    <p className={styles.resend_description}>
      Não recebeu o código?{" "}
      <button
        type="button"
        onClick={() => {
          callback();
          setSecondsLeft(COOLDOWN_SECONDS);
        }}
        disabled={disabled}
        className={styles.resend_btn}
      >
        {disabled ? ` ${secondsLeft}s` : children}
      </button>
    </p>
  );
};

export default ResendOtpCodeBtn;
