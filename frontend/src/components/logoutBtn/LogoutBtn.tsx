import styles from "./logou.module.css";
import { useUserStore } from "../../store/userSession.store";

const LogoutBtn = () => {
  const { logout } = useUserStore();

  return (
    <button onClick={logout} className={styles.item}>
      Sair
    </button>
  );
};

export default LogoutBtn;
