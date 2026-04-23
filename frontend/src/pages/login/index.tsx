import { Navigate } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import styles from "./login.module.css";
import { useGetUser } from "../../hooks/React/useUser";
import { IoLogIn } from "react-icons/io5";

const Login = () => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return null;

  if (user) return <Navigate to="/" />;
  return (
    <main className={styles.main_login}>
      <div className={styles.left_panel}>
        <div className={styles.icon_wrapper}>
          <IoLogIn />
        </div>
      </div>
      <div className={styles.right_panel}>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
