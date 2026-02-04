import LoginForm from "../../components/loginForm/loginForm";
import styles from "./login.module.css";

const Login = () => {
  return (
    <main className={styles.main_login}>
      <div className={styles.container_main}>
        <div className={styles.container_input}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
