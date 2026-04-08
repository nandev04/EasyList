import React from "react";
import { GiNotebook } from "react-icons/gi";
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
          <h1 className={styles.title}>Registre-se</h1>
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
