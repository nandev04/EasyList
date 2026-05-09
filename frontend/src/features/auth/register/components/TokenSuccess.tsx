import { RiVerifiedBadgeFill } from "react-icons/ri";
import styles from "./token.module.css";
import { useNavigate } from "react-router-dom";

const TokenSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.content_container}>
        <RiVerifiedBadgeFill color="var(--primary-color)" />
        <h1 className={styles.status_title}>Conta verificada!</h1>
        <p className={styles.description}>
          Agora você pode voltar e fazer o login normalmente.
        </p>
        <button onClick={() => navigate("/login")} className={styles.btn}>
          Ir para o login
        </button>
      </div>
    </>
  );
};

export default TokenSuccess;
