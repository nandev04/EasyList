import { useState } from "react";
import styles from "./DeleteTaskBtn.module.css";
import { BiSolidTrash } from "react-icons/bi";
import loadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import useDelayLoading from "../../hooks/useDelayLoading";
import { deleteTask } from "../../services/task.service";
import { queryClient } from "../../lib/reactQuery";

const DeleteTaskBtn = ({ taskId }: { taskId: number }) => {
  const [loading, setLoading] = useState(false);
  const { showLoading } = useDelayLoading(loading, 150);

  async function onDeleteTask() {
    try {
      setLoading(true);
      await deleteTask(taskId);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper_button}>
      <button className={styles.button} onClick={onDeleteTask}>
        {showLoading ? <LoadingCircleSpinner /> : <BiSolidTrash />}
      </button>
    </div>
  );
};

export default DeleteTaskBtn;
