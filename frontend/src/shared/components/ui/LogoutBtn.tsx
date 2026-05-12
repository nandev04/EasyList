import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "../../../features/auth/hooks/useLogout.query";

const LogoutBtn = () => {
  const { mutate: logout } = useLogoutMutation();

  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      <span>Sair</span> <FiLogOut strokeWidth={2} />
    </button>
  );
};

export default LogoutBtn;
