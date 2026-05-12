import { MdCancel } from "react-icons/md";
import styles from "./token.module.css";

const TokenError = () => {
  return (
    <>
      <div className={styles.content_container}>
        <MdCancel color="#FF6E6E" />
        <h1 className={styles.status_title}>Token inválido ou expirado</h1>
        <p className={styles.description}>
          O link de verificação está inválido, clique no botão para enviar um
          novo link para o email registrado.
        </p>
        <button onClick={() => console.log("new link")} className={styles.btn}>
          Solicite um novo link
        </button>
      </div>
    </>
  );
};

export default TokenError;
