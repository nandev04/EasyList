import styles from "./CreateTaskBtn.module.css";
import { RiAddFill } from "react-icons/ri";

const CreateTaskBtn = () => {
  return (
    <div className={styles.wrapper_button}>
      <button className={styles.button}>
        <RiAddFill />
      </button>
    </div>
  );
};

export default CreateTaskBtn;
