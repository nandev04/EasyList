import { MdOutlineMailLock } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import styles from "./componentEmailInput.module.css";

const ComponentEmailInput = () => {
  return (
    <div className={styles.content_container}>
      <div className={styles.image_wrapper}>
        <MdOutlineMailLock />
      </div>
      <h1 className={styles.status_title}>Informe o email cadastrado</h1>
      <p className={styles.description}>
        Digite o e-mail cadastrado para receber um código de 6 dígitos para
        redefinir sua senha.
      </p>
      <form className={styles.form}>
        <input autoComplete="email" type="email" className={styles.input} />
        <button className={styles.submit_btn} type="submit">
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default ComponentEmailInput;
