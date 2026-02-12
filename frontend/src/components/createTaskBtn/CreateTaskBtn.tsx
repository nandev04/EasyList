import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import style from "./CreateTaskBtn.module.css";
import { RiAddFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, taskSchemaType } from "../../schemas/taskSchema";
import LoadingCircleSpinner from "../loadingCircleSpinner/loadingCircleSpinner";
import { createTask } from "../../services/task.service";
import { queryClient } from "../../lib/reactQuery";
import useDelayLoading from "../../hooks/useDelayLoading";
const CreateTaskBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingCreateTask, setLoadingCreateTask] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<taskSchemaType>({
    resolver: zodResolver(taskSchema),
    mode: "onSubmit",
  });
  const { showLoading } = useDelayLoading(loadingCreateTask, 150);

  async function onSubmit(data: taskSchemaType): Promise<void> {
    try {
      setLoadingCreateTask(true);
      await createTask(data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCreateTask(false);
    }
  }

  return (
    <>
      <div className={style.wrapper_button}>
        <button className={style.button_create} onClick={() => setIsOpen(true)}>
          <RiAddFill />
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          (reset(), setIsOpen(false));
        }}
        className={style.root}
      >
        <div className={style.overlay} />
        <div className={style.container}>
          <DialogPanel className={style.panel}>
            <div className={style.panel_content}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  className={style.title_input}
                  placeholder="Título"
                  {...register("title")}
                />
                {errors.title && (
                  <span className={style.error_message}>
                    {errors.title.message}
                  </span>
                )}
                <textarea
                  className={style.description_input}
                  placeholder="Descrição"
                  {...register("description")}
                />
                {errors.description && (
                  <span className={style.error_message}>
                    {errors.description.message}
                  </span>
                )}

                <div className={style.actions}>
                  <button
                    disabled={loadingCreateTask}
                    type="submit"
                    className={style.createTask}
                  >
                    {showLoading ? <LoadingCircleSpinner /> : "Criar tarefa"}
                  </button>
                </div>
              </form>
              <button
                className={style.button_close}
                onClick={() => {
                  (reset(), setIsOpen(false));
                }}
              >
                <IoCloseSharp />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CreateTaskBtn;
