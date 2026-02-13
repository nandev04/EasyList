import { useState } from "react";
import styles from "./DeleteTaskBtn.module.css";
import { BiSolidTrash } from "react-icons/bi";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import useDelayLoading from "../../hooks/useDelayLoading";
import { deleteTask } from "../../services/task.service";
import { queryClient } from "../../lib/reactQuery";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

const DeleteTaskBtn = ({ taskId }: { taskId: number }) => {
  const [loading, setLoading] = useState(false);
  const { showLoading } = useDelayLoading(loading, 150);
  const [isOpen, setIsOpen] = useState(false);

  async function onDeleteTask() {
    try {
      setLoading(true);
      await deleteTask(taskId);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.wrapper_button}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          {showLoading ? <LoadingCircleSpinner /> : <BiSolidTrash />}
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.overlay}>
          <DialogPanel className={styles.panel}>
            <DialogTitle className={styles.title_dialog}>
              Tem certeza que deseja deletar essa tarefa?
            </DialogTitle>
            <div className={styles.actions}>
              <button className={styles.button_delete} onClick={onDeleteTask}>
                Deletar
              </button>
              <button
                className={`${styles.button_cancel} ${styles.cancel}`}
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteTaskBtn;
