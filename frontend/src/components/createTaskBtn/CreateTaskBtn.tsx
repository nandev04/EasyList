import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import style from "./CreateTaskBtn.module.css";
import { RiAddFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, taskSchemaType } from "../../schemas/taskSchema";

const CreateTaskBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskSchemaType>({
    resolver: zodResolver(taskSchema),
    mode: "onSubmit",
  });

  function envia(data: taskSchemaType) {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={style.wrapper_button}>
        <button className={style.button} onClick={() => setIsOpen(true)}>
          <RiAddFill />
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={style.root}
      >
        <div className={style.overlay} />
        <div className={style.container}>
          <DialogPanel className={style.panel}>
            <form onSubmit={handleSubmit(envia)}>
              <input
                type="text"
                className={style.title_input}
                placeholder="Título"
                {...register("title")}
              />
              <textarea
                className={style.description_input}
                placeholder="Descrição"
                {...register("description")}
              />

              <div className={style.actions}>
                <button type="submit" className={style.createTask}>
                  Criar Tarefa
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CreateTaskBtn;
