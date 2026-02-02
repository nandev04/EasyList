import styles from "./login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login = () => {
  return (
    <main className={styles.main_login}>
      <div className={styles.container_main}>
        <div className={styles.container_input}>
          <div>
            <Input name="user" placeholder="Usuário" type="text" />
            <Input name="password" placeholder="Senha" type="password" />
            <a className={styles.links}>
              Esqueceu sua <span className={styles.contrast}>senha?</span>
            </a>
            <Button>Login</Button>
            <a
              className={styles.links}
              style={{ fontStyle: "normal", fontWeight: "500" }}
            >
              Ainda não tem uma conta?{" "}
              <span className={styles.contrast}>Registre-se</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
