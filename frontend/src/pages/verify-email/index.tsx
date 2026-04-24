import React, { useState } from "react";
import styles from "./verifyEmail.module.css";
import { MdAlternateEmail, MdMarkEmailRead } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailVerifySchema,
  emailVerifySchemaType,
} from "../../schemas/sendEmailVerify.schema";

const VerifyEmail = () => {
  const [email, setEmail] =
    useState<React.SetStateAction<String | null>>("email");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(emailVerifySchema),
  });

  async function sendEmail(dataForm: emailVerifySchemaType) {
    console.log(dataForm.email);
    return;
  }

  return (
    <>
      <span className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          {!email ? (
            <div className={styles.content_container}>
              <MdAlternateEmail color="var(--primary-color)" />
              <h1 className={styles.status_title}>Verificação de conta</h1>
              <p className={styles.description}>
                Digite seu e-mail para receber um link de verificação da conta.
              </p>
              <form
                noValidate
                onSubmit={handleSubmit(sendEmail)}
                className={styles.form}
              >
                <input
                  autoComplete="email"
                  type="email"
                  {...register("email")}
                  className={styles.input}
                />
                <button
                  className={styles.submit_btn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <IoIosSend />
                </button>
              </form>
              {errors.email && (
                <span className={styles.error_message}>
                  {errors.email.message}
                </span>
              )}
            </div>
          ) : (
            <div className={styles.content_container}>
              <MdMarkEmailRead color="var(--primary-color)" />
              <h1 className={styles.status_title}>Verifique o email</h1>
              <p className={styles.description}>
                Enviamos um e-mail de verificação. Verifique sua caixa de
                entrada (e a pasta de spam) e clique no link para confirmar sua
                conta.
              </p>
              <button
                onClick={() => setEmail(null)}
                className={styles.resendEmail_btn}
              >
                Reenviar email
              </button>
              <button className={styles.goToLogin_btn}>Ir para o login</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
