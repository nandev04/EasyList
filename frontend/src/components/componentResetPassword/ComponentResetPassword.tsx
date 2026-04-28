import { IoIosLock } from "react-icons/io";
import styles from "./componentResetPassword.module.css";

const ComponentResetPassword = () => {
  return (
    <div className={styles.content_container}>
      <div className={styles.icon_box}>
        <IoIosLock />
      </div>
      <h1 className={styles.status_title}>Redefinição de senha</h1>
      <p className={styles.description}>
        Defina sua nova senha para concluir a alteração da sua conta.
      </p>
      <form className={styles.form}>
        <div className={styles.input_group}>
          <label className={styles.label} htmlFor="newPassword">
            Nova senha
          </label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            className={styles.input}
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirme sua nova senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submit_btn}>
          Alterar senha
        </button>
      </form>
    </div>
  );
};

export default ComponentResetPassword;
