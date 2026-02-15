import { useState } from "react";
import styles from "./editTaskBtn.module.css";
import { MdEdit } from "react-icons/md";
import useDelayLoading from "../../hooks/useDelayLoading";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { EditTaskPayload } from "../../types/task.types";

const EditTaskBtn = ({ taskId }: { taskId: number }) => {
  // Preciso construir o modal para editTask junto com sua lógica, apenas copiei o modal do DeleteTaskBtn

  const [loading, setLoading] = useState(false);
  const { showLoading } = useDelayLoading(loading, 150);
  const [isOpen, setIsOpen] = useState(false);

  async function onEditTask() {
    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.wrapper_button}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          <MdEdit />
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.overlay}>
          <DialogPanel className={styles.panel}>
            <DialogTitle className={styles.title_dialog}>
              Tem certeza que deseja deletar essa tarefa?
            </DialogTitle>
            <div className={styles.actions}>
              <button className={styles.button_edit} onClick={onEditTask}>
                {showLoading ? <LoadingCircleSpinner /> : "Editar Tarefa"}
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

export default EditTaskBtn;
