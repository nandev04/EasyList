import { MdOutlineMailLock } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import styles from "./stepEmail.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendEmailForgotPassword } from "../../services/auth.service";
import { AxiosError } from "axios";
import LoadingCircleSpinner from "../../../../shared/components/ui/LoadingCircleSpinner";
import {
  emailValidateSchema,
  emailValidateSchemaType,
} from "../../../../shared/schema/email.schema";

const StepEmail = ({
  onSuccess,
  initialEmail,
}: {
  onSuccess: (email: string) => void;
  initialEmail?: string;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: initialEmail ?? "" },
    resolver: zodResolver(emailValidateSchema),
  });

  async function submitEmail({ email }: emailValidateSchemaType) {
    try {
      await sendEmailForgotPassword({ email });
      onSuccess(email);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "Ocorreu um erro inesperado" });
      }
    }
  }

  return (
    <div className={styles.content_container}>
      <div className={styles.image_wrapper}>
        <MdOutlineMailLock />
      </div>
      <h1 className={styles.status_title}>Informe o email cadastrado</h1>
      <p className={styles.description}>
        Digite o e-mail cadastrado para receber um código de 6 dígitos para
        redefinir sua senha.
      </p>
      <form
        noValidate
        onSubmit={handleSubmit(submitEmail)}
        className={styles.form}
      >
        <div className={styles.field}>
          <input
            {...register("email")}
            autoComplete="email"
            type="email"
            name="email"
            className={styles.input}
          />
          {errors.email?.message && (
            <p className={styles.error_message}>{errors.email.message}</p>
          )}
          {errors.root?.message && (
            <p className={styles.error_message}>{errors.root.message}</p>
          )}
        </div>
        <button
          className={styles.submit_btn}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? <LoadingCircleSpinner /> : <IoIosSend />}
        </button>
      </form>
    </div>
  );
};

export default StepEmail;
