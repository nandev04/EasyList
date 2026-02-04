import { useForm } from "react-hook-form";
import styles from "./loginform.module.css";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container_input}>
        <div className={styles.wrapper}>
          <input
            className={styles.input}
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className={styles.wrapper}>
          <input
            placeholder="Senha"
            type="password"
            className={styles.input}
            {...register("password")}
          />
        </div>
      </div>

      <a className={styles.links}>
        Esqueceu sua <span className={styles.contrast}>senha?</span>
      </a>
      <button className={styles.btnSubmit} type="submit">
        Login
      </button>

      <a className={styles.links} style={{ fontStyle: "normal" }}>
        <p>
          Ainda não tem uma conta?
          <span className={styles.contrast}> Registre-se</span>
        </p>
      </a>
    </form>
  );
}
