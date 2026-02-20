import styles from "./logou.module.css";
import { useUserStore } from "../../store/userSession.store";

const LogoutBtn = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <button onClick={logout} className={styles.item}>
      Sair
    </button>
  );
};

export default LogoutBtn;
