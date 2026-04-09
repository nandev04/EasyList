import { Navigate } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import styles from "./login.module.css";
import { useGetUser } from "../../hooks/React/useUser";

const Login = () => {
  const { data: user } = useGetUser();

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
