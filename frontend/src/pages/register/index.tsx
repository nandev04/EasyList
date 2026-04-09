import { GiNotebook } from "react-icons/gi";
import { FaPencilAlt } from "react-icons/fa";
import styles from "./register.module.css";
import RegisterForm from "../../components/registerForm/RegisterForm";

const Register = () => {
  return (
    <div className={styles.content_container}>
      <div className={styles.notebook_wrapper}>
        <GiNotebook />
      </div>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Registre-se{" "}
            <span className={styles.pencil_container}>
              <FaPencilAlt />
            </span>
          </h1>
          <p className={styles.description}>
            Já tem uma conta?{" "}
            <a href="/login" className={styles.description_contrast}>
              faça login
            </a>
          </p>
        </header>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
