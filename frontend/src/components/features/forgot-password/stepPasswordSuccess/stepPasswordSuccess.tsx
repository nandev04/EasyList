import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "./stepPasswordSuccess.module.css";

const StepPasswordSuccess = () => {
  return (
    <div className={styles.content_container}>
      <div className={styles.icon_box}>
        <IoMdCheckmarkCircleOutline />
      </div>
      <h1 className={styles.status_title}>Senha alterada</h1>
      <p className={styles.description}>
        Senha alterada com sucesso! Agora você pode fazer login.
      </p>
      <Link to="/login" className={styles.login_btn}>
        Ir para o login
      </Link>
    </div>
  );
};

export default StepPasswordSuccess;
