import { useForm } from "react-hook-form";
import styles from "./loginform.module.css";
import { loginSchema, loginSchemaType } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CiLogin } from "react-icons/ci";
import { AxiosError } from "axios";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";

const loginForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(dataInput: loginSchemaType) {
    try {
      await loginUser(dataInput);
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = "Ocorreu um erro ao tentar o login";

        setError("root", {
          type: "server",
          message:
            err.response?.status === 429
              ? "Ocorreu muitas tentativas, tente novamente mais tarde"
              : err.response?.status === 401
                ? err.response.data.message
                : message,
        });
      } else {
        setError("root", {
          type: "server",
          message: "Ocorreu um erro ao cadastrar o usuário",
        });
      }
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>
        Login
        <CiLogin />
      </h1>
      <p className={styles.subtitle}>
        Ainda não tem uma conta?{" "}
        <Link to="/register" className={styles.link_register}>
          Registre-se
        </Link>
      </p>

      <div className={styles.container_input}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Senha</label>
          <input
            type="password"
            autoComplete="current-password"
            className={styles.input}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error_message}>
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      {errors.root?.message && (
        <span className={styles.error_message}>{errors.root.message}</span>
      )}

      <a className={styles.forgot_link}>
        Esqueceu a <span className={styles.contrast}>senha?</span>
      </a>

      <div className={styles.submit_row}>
        <button
          className={styles.btnSubmit}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? <LoadingCircleSpinner /> : "Login"}
        </button>
      </div>
    </form>
  );
};

export default loginForm;
