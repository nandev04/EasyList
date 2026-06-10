import { useForm } from "react-hook-form";
import styles from "./registerForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import { AxiosError } from "axios";
import LoadingCircleSpinner from "../../../../shared/components/ui/LoadingCircleSpinner";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../hooks/useRegister.mutation";

const RegisterForm = () => {
  const { mutate, isPending } = useCreateUserMutation();
  const registerForm = useForm({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  async function registerSubmit(data: registerSchemaType) {
    mutate(data, {
      onSuccess: () => {
        navigate("/verify-email", { state: { email: data.email } });
        registerForm.reset();
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          const message = "Ocorreu um erro ao cadastrar";

          registerForm.setError("root", {
            type: "server",
            message:
              err.response?.status === 429
                ? "Ocorreu muitas tentativas, tente novamente mais tarde"
                : message,
          });
        } else {
          registerForm.setError("root", {
            type: "server",
            message: "Ocorreu um erro ao cadastrar o usuário",
          });
        }
      },
    });
  }

  return (
    <form
      className={styles.form}
      onSubmit={registerForm.handleSubmit(registerSubmit)}
      noValidate
    >
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="firstname">
          Nome
        </label>
        <input
          className={styles.input}
          id="firstname"
          type="text"
          autoComplete="name"
          {...registerForm.register("firstname")}
        />
        {registerForm.formState.errors.firstname && (
          <p className={styles.error_message}>
            {registerForm.formState.errors.firstname.message}
          </p>
        )}
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="lastname">
          Sobrenome
        </label>
        <input
          autoComplete="family-name"
          id="lastname"
          type="text"
          className={styles.input}
          {...registerForm.register("lastname")}
        />
        {registerForm.formState.errors.lastname && (
          <p className={styles.error_message}>
            {registerForm.formState.errors.lastname.message}
          </p>
        )}
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="username">
          Nome de usuário
        </label>
        <input
          autoComplete="username"
          id="username"
          type="text"
          className={styles.input}
          {...registerForm.register("username")}
        />
        {registerForm.formState.errors.username && (
          <p className={styles.error_message}>
            {registerForm.formState.errors.username.message}
          </p>
        )}
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          id="email"
          className={styles.input}
          type="email"
          {...registerForm.register("email")}
        />
        {registerForm.formState.errors.email && (
          <p className={styles.error_message}>
            {registerForm.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          autoComplete="new-password"
          id="password"
          type="password"
          className={styles.input}
          {...registerForm.register("password")}
        />
        {registerForm.formState.errors.password && (
          <p className={styles.error_message}>
            {registerForm.formState.errors.password.message}
          </p>
        )}
      </div>
      <div className={styles.error_submit_container}>
        {registerForm.formState.errors.root?.message && (
          <p>{registerForm.formState.errors.root.message}</p>
        )}
      </div>
      <div className={styles.btn_container}>
        <button
          disabled={isPending}
          className={styles.submit_btn}
          type="submit"
        >
          {isPending ? <LoadingCircleSpinner /> : "Registre-se"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
