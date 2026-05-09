import { useEffect } from "react";
import { IoIosLock } from "react-icons/io";
import styles from "./stepResetPassword.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newPasswordForgotSchema,
  newPasswordForgotSchemaType,
} from "../../../../schemas/newPasswordForgot";
import { sendNewPasswordForgot } from "../../../../features/auth/services/auth.service";
import { AxiosError } from "axios";
import LoadingCircleSpinner from "../../../../shared/components/ui/LoadingCircleSpinner";

const StepResetPassword = ({
  onSuccess,
  resetToken,
  onBack,
  onExpired,
}: {
  onSuccess: () => void;
  onBack: () => void;
  onExpired: () => void;
  resetToken: string;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<newPasswordForgotSchemaType>({
    resolver: zodResolver(newPasswordForgotSchema),
  });

  useEffect(() => {
    if (!resetToken) onBack();
  }, []);

  async function sendNewPassword({ newPassword }: newPasswordForgotSchemaType) {
    try {
      await sendNewPasswordForgot({
        newPassword,
        tokenResetPassword: resetToken,
      });
      onSuccess();
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        if (status === 401 || status === 410) {
          onExpired();
          return;
        }
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "Ocorreu um erro inesperado" });
      }
    }
  }

  return (
    <div className={styles.content_container}>
      <div className={styles.icon_box}>
        <IoIosLock />
      </div>
      <h1 className={styles.status_title}>Redefinição de senha</h1>
      <p className={styles.description}>
        Defina sua nova senha para concluir a alteração da sua conta.
      </p>
      <form onSubmit={handleSubmit(sendNewPassword)} className={styles.form}>
        <div className={styles.input_group}>
          <label className={styles.label} htmlFor="newPassword">
            Nova senha
          </label>
          <input
            {...register("newPassword")}
            id="newPassword"
            type="password"
            autoComplete="new-password"
            className={styles.input}
          />
          {errors.newPassword?.message && (
            <p className={styles.error_message}>{errors.newPassword.message}</p>
          )}
        </div>
        <div className={styles.input_group}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirme sua nova senha
          </label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={styles.input}
          />
          {errors.confirmPassword?.message && (
            <p className={styles.error_message}>
              {errors.confirmPassword.message}
            </p>
          )}
          {errors.root?.message && (
            <p className={styles.error_message}>{errors.root.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={styles.submit_btn}
        >
          {isSubmitting ? <LoadingCircleSpinner /> : "Alterar senha"}
        </button>
      </form>
    </div>
  );
};

export default StepResetPassword;
