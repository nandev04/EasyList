import LoginForm from "../../components/loginForm/loginForm";
import styles from "./login.module.css";
import { IoLogIn } from "react-icons/io5";

const Login = () => {
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
