import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./requestVerificationForm.module.css";
import {
  emailVerifySchema,
  emailVerifySchemaType,
} from "../../../../schemas/sendEmailVerify.schema";
import { resendLinkVerifyAccount } from "../../services/auth.service";
import LoadingCircleSpinner from "../../../../shared/components/ui/LoadingCircleSpinner";
import { IoIosSend } from "react-icons/io";

const RequestVerificationForm = ({
  setEmail,
}: {
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const {
    register,
    setError,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(emailVerifySchema),
  });

  async function sendEmail({ email }: emailVerifySchemaType) {
    try {
      await resendLinkVerifyAccount({ email });
      setEmail(email);
    } catch (err) {
      return setError("root", {
        message: "Ocorreu um erro com a solicitação",
      });
    }
  }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(sendEmail)}
        className={styles.form}
      >
        <input
          autoComplete="email"
          type="email"
          {...register("email")}
          onChange={() => {
            if (errors.root) {
              clearErrors("root");
            }
          }}
          className={styles.input}
        />
        <button
          className={styles.submit_btn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingCircleSpinner /> : <IoIosSend />}
        </button>
      </form>
      {errors.email && (
        <span className={styles.error_message}>{errors.email.message}</span>
      )}
      {errors.root && (
        <span className={styles.error_message}>{errors.root.message}</span>
      )}
    </>
  );
};

export default RequestVerificationForm;
