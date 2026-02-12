import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import styles from "./CreateTaskBtn.module.css";
import { RiAddFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, taskSchemaType } from "../../schemas/taskSchema";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import { createTask } from "../../services/task.service";
import { queryClient } from "../../lib/reactQuery";
import useDelayLoading from "../../hooks/useDelayLoading";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { OptionsStatusTask } from "../../types/task.types";
const CreateTaskBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingCreateTask, setLoadingCreateTask] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<taskSchemaType>({
    defaultValues: {
      status: "PENDING",
    },
    resolver: zodResolver(taskSchema),
    mode: "onSubmit",
  });
  const { showLoading } = useDelayLoading(loadingCreateTask, 150);

  const options: OptionsStatusTask[] = [
    { name: "Pendente", value: "PENDING" },
    { name: "Em progresso", value: "IN_PROGRESS" },
    { name: "Concluído", value: "COMPLETED" },
  ];

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
      <div className={styles.wrapper_button}>
        <button
          className={styles.button_create}
          onClick={() => setIsOpen(true)}
        >
          <RiAddFill />
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          (reset(), setIsOpen(false));
        }}
        className={styles.root}
      >
        <div className={styles.overlay} />
        <div className={styles.container}>
          <DialogPanel className={styles.panel}>
            <div className={styles.panel_content}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  className={styles.title_input}
                  placeholder="Título"
                  {...register("title")}
                />
                {errors.title && (
                  <span className={styles.error_message}>
                    {errors.title.message}
                  </span>
                )}
                <textarea
                  className={styles.description_input}
                  placeholder="Descrição"
                  {...register("description")}
                />
                {errors.description && (
                  <span className={styles.error_message}>
                    {errors.description.message}
                  </span>
                )}

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onChange={field.onChange}
                      aria-label="Server size"
                      className={styles.group}
                    >
                      {options.map((option) => (
                        <Field key={option.value} className={styles.field}>
                          <Radio value={option.value} className={styles.radio}>
                            <span className={styles.indicator} />
                          </Radio>

                          <Label className={styles.label}>{option.name}</Label>
                        </Field>
                      ))}
                    </RadioGroup>
                  )}
                />

                <div className={styles.actions}>
                  <button
                    disabled={loadingCreateTask}
                    type="submit"
                    className={styles.createTask}
                  >
                    {showLoading ? <LoadingCircleSpinner /> : "Criar tarefa"}
                  </button>
                </div>
              </form>
              <button
                className={styles.button_close}
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
