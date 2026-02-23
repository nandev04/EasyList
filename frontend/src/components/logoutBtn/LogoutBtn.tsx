import { useUserStore } from "../../store/userSession.store";
import { FiLogOut } from "react-icons/fi";
const LogoutBtn = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <button onClick={logout}>
      <span>Sair</span> <FiLogOut strokeWidth={2} />
    </button>
  );
};

export default LogoutBtn;
