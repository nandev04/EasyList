import { Navigate } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import { useUserStore } from "../../store/userSession.store";
import styles from "./login.module.css";

const Login = () => {
  const { user } = useUserStore();

  if (user) return <Navigate to="/" />;
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
