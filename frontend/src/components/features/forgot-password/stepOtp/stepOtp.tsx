import { useEffect } from "react";
import { MdPin } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPInput } from "input-otp";
import OtpSlots from "../../../OtpComponent/OtpSlots";
import styles from "./stepOtp.module.css";
import { otpSchema, otpSchemaType } from "../../../../schemas/emailOtp.schema";
import { sendOtpForgotPassword } from "../../../../services/auth.service";
import { AxiosError } from "axios";
import LoadingCircleSpinner from "../../../loadingCircleSpinner/LoadingCircleSpinner";

const StepOtp = ({
  onSuccess,
  onBack,
  onExpired,
  email,
}: {
  onSuccess: (resetToken: string) => void;
  onBack: () => void;
  onExpired: () => void;
  email: string;
}) => {
  const otpForm = useForm<otpSchemaType>({
    defaultValues: { code: "" },
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });

  const codeSlots = otpForm.watch("code");

  useEffect(() => {
    if (!email) onBack();
  }, []);

  async function onSubmit({ code }: otpSchemaType) {
    try {
      const response = await sendOtpForgotPassword({ code, email });

      onSuccess(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        if (status === 401 || status === 410) {
          onExpired();
          return;
        }
        otpForm.setError("root", { message: err.message });
      } else {
        otpForm.setError("root", { message: "Ocorreu um erro inesperado" });
      }
    }
  }

  return (
    <div className={styles.content_container}>
      <div className={styles.icon_box}>
        <MdPin />
      </div>
      <h1 className={styles.status_title}>Confirme o código</h1>
      <p className={styles.description}>
        Informe o código de 6 dígitos que enviamos para o seu e-mail para
        prosseguir.
      </p>
      <form className={styles.form} onSubmit={otpForm.handleSubmit(onSubmit)}>
        <div className={styles.otp_wrapper}>
          <Controller
            name="code"
            control={otpForm.control}
            render={({ field }) => (
              <OTPInput
                name="code"
                maxLength={6}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  otpForm.clearErrors("root");
                }}
                render={({ slots }) => <OtpSlots slots={slots} />}
              />
            )}
          />
          {otpForm.formState.errors.code && (
            <span className={styles.error_message}>
              {otpForm.formState.errors.code.message}
            </span>
          )}
          {otpForm.formState.errors.root && (
            <span className={styles.error_message}>
              {otpForm.formState.errors.root.message}
            </span>
          )}
        </div>
        <div className={styles.actions_container}>
          <button
            onClick={() => onBack()}
            type="button"
            className={styles.back_btn}
          >
            Voltar
          </button>
          <button
            disabled={codeSlots.length < 6 || otpForm.formState.isSubmitting}
            type="submit"
            className={styles.continue_btn}
          >
            {otpForm.formState.isSubmitting ? (
              <LoadingCircleSpinner />
            ) : (
              "Continuar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOtp;
