import { useForm } from "react-hook-form";
import styles from "./registerForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/register.schema";

const RegisterForm = () => {
  const registerForm = useForm({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  function registerSubmit(data: any) {
    console.log(data);
  }

  return (
    <form
      className={styles.form}
      onSubmit={registerForm.handleSubmit(registerSubmit)}
    >
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="firstname">
          Nome
        </label>
        <input
          className={styles.input}
          id="firstname"
          autoComplete="name"
          {...registerForm.register("firstname")}
        />
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="lastname">
          Sobrenome
        </label>
        <input
          autoComplete="family-name"
          id="lastname"
          className={styles.input}
          {...registerForm.register("lastname")}
        />
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="username">
          Nome de usuário
        </label>
        <input
          autoComplete="username"
          id="username"
          className={styles.input}
          {...registerForm.register("username")}
        />
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          id="email"
          className={styles.input}
          {...registerForm.register("email")}
        />
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          autoComplete="new-password"
          id="password"
          className={styles.input}
          {...registerForm.register("password")}
        />
      </div>
      <div className={styles.btn_container}>
        <button className={styles.submit_btn} type="submit">
          Registre-se
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
