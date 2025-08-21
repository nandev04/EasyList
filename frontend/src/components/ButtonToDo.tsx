import styles from "../styles/button-to-do.module.css";
import { MdOutlineAdd } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

type typeBtn = "add" | "modify" | "del";

const ButtonToDo = ({ type, size }: { type: typeBtn; size: number }) => {
  return (
    <button
      className={styles.btnto}
      style={{
        width: size + 15,
        height: size + 15,
        padding: size - (type !== "add" ? 15 : size - 10),
      }}
    >
      {type === "add" && <MdOutlineAdd fill="white" />}
      {type === "modify" && <FaPen fill="white" />}
      {type === "del" && <FaTrashAlt fill="white" />}
    </button>
  );
};

export default ButtonToDo;
