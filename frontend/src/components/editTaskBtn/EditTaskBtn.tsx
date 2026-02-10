import styles from "./editTaskBtn.module.css";
import { MdEdit } from "react-icons/md";

const EditTaskBtn = () => {
  return (
    <div className={styles.wrapper_button}>
      <button className={styles.button}>
        <MdEdit />
      </button>
    </div>
  );
};

export default EditTaskBtn;
