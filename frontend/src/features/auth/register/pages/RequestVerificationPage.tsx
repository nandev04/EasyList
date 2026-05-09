import { useState } from "react";
import styles from "./requestVerificationPage.module.css";
import { MdAlternateEmail, MdMarkEmailRead } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import RequestVerificationForm from "../components/RequestVerificationForm";

const VerifyEmail = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(
    location.state?.email ?? null,
  );

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
              <RequestVerificationForm setEmail={setEmail} />
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
