import { RiVerifiedBadgeFill } from "react-icons/ri";
import styles from "./token.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TokenSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.content_container}>
      <RiVerifiedBadgeFill color="var(--primary-color)" />
      <h1 className={styles.status_title}>Conta verificada!</h1>
      <p className={styles.description}>
        Você será redirecionado em instantes. Caso contrário, clique no botão.
      </p>
      <button onClick={() => navigate("/login")} className={styles.btn}>
        Ir para o login
      </button>
    </div>
  );
};

export default TokenSuccess;
