import { useForm } from "react-hook-form";
import styles from "./loginform.module.css";
import { loginSchema, loginSchemaType } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: loginSchemaType) {
    try {
      await loginUser(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container_input}>
        <div className={styles.wrapper}>
          <input
            className={styles.input}
            placeholder="Email"
            autoComplete="username"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className={styles.error_message}>{errors.email.message}</span>
        )}
        <div className={styles.wrapper}>
          <input
            placeholder="Senha"
            type="password"
            autoComplete="current-password"
            className={styles.input}
            {...register("password")}
          />
        </div>
        {errors.password && (
          <span className={styles.error_message}>
            {errors.password.message}
          </span>
        )}
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
