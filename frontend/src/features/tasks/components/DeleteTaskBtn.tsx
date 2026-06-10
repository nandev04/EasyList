import { useState } from "react";
import styles from "./deleteTaskBtn.module.css";
import { BiSolidTrash } from "react-icons/bi";
import LoadingCircleSpinner from "../../../shared/components/ui/LoadingCircleSpinner";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDeleteTaskMutation } from "../hooks/useTask.query";

const DeleteTaskBtn = ({
  taskId,
  variant,
}: {
  taskId: number;
  variant: "desktop_button" | "mobile_button";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, isError } = useDeleteTaskMutation();

  async function onDeleteTask() {
    mutate(taskId, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <>
      <div className={styles.wrapper_button}>
        <button className={styles[variant]} onClick={() => setIsOpen(true)}>
          <BiSolidTrash />
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.overlay}>
          <DialogPanel className={styles.panel}>
            <div className={styles.general_container}>
              <DialogTitle className={styles.title_dialog}>
                Tem certeza que deseja deletar essa tarefa?
              </DialogTitle>
              <div className={styles.actions}>
                <button
                  className={styles.button_delete}
                  disabled={isPending}
                  onClick={onDeleteTask}
                >
                  {isPending ? <LoadingCircleSpinner /> : "Deletar"}
                </button>
                <button
                  className={`${styles.button_cancel}`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
            {isError && (
              <p className={styles.error_message}>
                Ocorreu um erro ao deletar tarefa
              </p>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteTaskBtn;
