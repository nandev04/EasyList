import { Controller, UseFormReturn } from "react-hook-form";
import { OTPInput } from "input-otp";
import OtpSlots from "../../../shared/components/ui/OtpComponents/OtpSlots";
import ResendOtpCodeBtn from "./ResendOtpCodeBtn";
import styles from "./FormConfirmEmailOtp.module.css";

type callbackTypes = {
  callbackOtp: (data: { code: string }) => Promise<void>;
  callbackResend: (data: {
    firstname?: string | undefined;
    lastname?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
  }) => Promise<void>;
};

const FormConfirmEmailOtp = ({
  emailInput,
  otpUseForm,
  callbackOtp,
  callbackResend,
}: {
  emailInput: string | undefined;
  otpUseForm: UseFormReturn<{
    code: string;
  }>;
} & callbackTypes) => {
  return (
    <div className={styles.container_inputOtp}>
      <form onSubmit={otpUseForm.handleSubmit(callbackOtp)}>
        <Controller
          name="code"
          control={otpUseForm.control}
          render={({ field }) => (
            <OTPInput
              name="code"
              maxLength={6}
              value={field.value}
              onChange={(value) => {
                (field.onChange(value), otpUseForm.clearErrors("root"));
              }}
              render={({ slots }) => <OtpSlots slots={slots} />}
            />
          )}
        />
        {otpUseForm.formState.errors.code && (
          <span
            style={{ display: "block", margin: "7px 0" }}
            className={styles.error_message}
          >
            {otpUseForm.formState.errors.code.message}
          </span>
        )}
        {otpUseForm.formState.errors.root && (
          <span
            style={{ display: "block", margin: "7px 0" }}
            className={styles.error_message}
          >
            {otpUseForm.formState.errors.root.message}
          </span>
        )}
        <div className={styles.actionsOTP_container}>
          <button className={styles.submit_otp} type="submit">
            Enviar código
          </button>
          <ResendOtpCodeBtn
            callback={() => callbackResend({ email: emailInput })}
          >
            Reenviar
          </ResendOtpCodeBtn>
        </div>
      </form>
    </div>
  );
};

export default FormConfirmEmailOtp;
