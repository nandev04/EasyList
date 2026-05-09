import { IoAlertCircle } from "react-icons/io5";
import styles from "./token.module.css";
import { useNavigate } from "react-router-dom";

const TokenNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.content_container}>
        <IoAlertCircle color="#F5B800" />
        <h1 className={styles.status_title}>Este link não é válido</h1>
        <p className={styles.description}>
          Não foi possível encontrar um token de verificação nesta página.
        </p>
        <button onClick={() => navigate("/login")} className={styles.btn}>
          Ir para o login
        </button>
      </div>
    </>
  );
};

export default TokenNotFound;
