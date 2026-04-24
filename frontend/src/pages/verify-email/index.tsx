import { useState } from "react";
import styles from "./verifyEmail.module.css";
import { MdAlternateEmail, MdMarkEmailRead } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailVerifySchema,
  emailVerifySchemaType,
} from "../../schemas/sendEmailVerify.schema";
import { Link, useLocation } from "react-router-dom";
import { resendLinkVerifyAccount } from "../../services/auth.service";
import LoadingCircleSpinner from "../../components/loadingCircleSpinner/LoadingCircleSpinner";

const VerifyEmail = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(
    location.state?.email ?? null,
  );

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
                <span className={styles.error_message}>
                  {errors.email.message}
                </span>
              )}
              {errors.root && (
                <span className={styles.error_message}>
                  {errors.root.message}
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
              <div className={styles.actions_container}>
                <button
                  onClick={() => setEmail(null)}
                  className={styles.resendEmail_btn}
                >
                  Reenviar email
                </button>
                <button className={styles.goToLogin_btn}>
                  <Link to={"/login"}>Ir para o login</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
