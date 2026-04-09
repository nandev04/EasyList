import { useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";

const ProfileBtn = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/profile")}>
      <span>Perfil</span> <MdPerson />
    </button>
  );
};

export default ProfileBtn;
