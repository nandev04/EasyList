import { useEffect, useState } from "react";
import styles from "./editTaskBtn.module.css";
import { MdEdit } from "react-icons/md";
import useDelayLoading from "../../hooks/React/useDelayLoading";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import {
  Dialog,
  DialogPanel,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { EditTaskPayload, OptionsStatusTask } from "../../types/task.types";
import { Controller, useForm } from "react-hook-form";
import { useEditTaskMutation } from "../../hooks/Query/useTaskMutation";
import CloseDialogBtn from "../closeDialogBtn/CloseDialogBtn";

const EditTaskBtn = ({
  data,
  taskId,
}: {
  data: EditTaskPayload;
  taskId: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, isError } = useEditTaskMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EditTaskPayload>({
    defaultValues: {
      title: data.title,
      description: data.description,
      status: data.status,
    },
    mode: "onSubmit",
  });
  const { showLoading } = useDelayLoading(isPending, 150);

  const options: OptionsStatusTask[] = [
    { name: "Pendente", value: "PENDING" },
    { name: "Em progresso", value: "IN_PROGRESS" },
    { name: "Concluído", value: "COMPLETED" },
  ];

  useEffect(() => {
    if (isOpen && data) {
      reset({ ...data });
    }
  }, [isOpen && data]);

  async function onSubmit(data: EditTaskPayload): Promise<void> {
    mutate(
      { taskId, data },
      {
        onSuccess: () => {
          (setIsOpen(false), reset());
        },
        onError: (err) => console.log(err),
      },
    );
  }

  return (
    <>
      <div className={styles.wrapper_button}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          <MdEdit />
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          (reset(), setIsOpen(false));
        }}
        className={styles.root}
      >
        <div className="overlay">
          <div className="container">
            <DialogPanel className="panel">
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
                  {isError && (
                    <span className={styles.error_message}>
                      Ocorreu um erro ao editar tarefa
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
                            <Radio
                              value={option.value}
                              className={styles.radio}
                            >
                              <span className={styles.indicator} />
                            </Radio>

                            <Label className={styles.label}>
                              {option.name}
                            </Label>
                          </Field>
                        ))}
                      </RadioGroup>
                    )}
                  />

                  <div className={styles.actions}>
                    <button
                      disabled={isPending}
                      type="submit"
                      className={styles.editTask}
                    >
                      {showLoading ? <LoadingCircleSpinner /> : "Editar tarefa"}
                    </button>
                  </div>
                </form>
                <CloseDialogBtn resetForm={reset} setIsOpenDialog={setIsOpen} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditTaskBtn;
