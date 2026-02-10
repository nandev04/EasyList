import styles from "./DeleteTaskBtn.module.css";
import { BiSolidTrash } from "react-icons/bi";

const DeleteTaskBtn = () => {
  return (
    <div className={styles.wrapper_button}>
      <button className={styles.button}>
        <BiSolidTrash />
      </button>
    </div>
  );
};

export default DeleteTaskBtn;
