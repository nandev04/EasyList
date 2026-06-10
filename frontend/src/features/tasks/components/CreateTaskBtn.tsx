import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import styles from "./createTaskBtn.module.css";
import { RiAddFill } from "react-icons/ri";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, createTaskSchemaType } from "../schema/task.schema";
import LoadingCircleSpinner from "../../../shared/components/ui/LoadingCircleSpinner";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { OptionsStatusTask } from "../types/task.types";
import { useCreateTaskMutation } from "../hooks/useTask.query";
import CloseDialogBtn from "../../../shared/components/CloseDialogBtn";
const CreateTaskBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "PENDING",
    },
    resolver: zodResolver(createTaskSchema),
    mode: "onSubmit",
  });
  const { mutate, isPending, isError, error } = useCreateTaskMutation();

  const options: OptionsStatusTask[] = [
    { name: "Pendente", value: "PENDING" },
    { name: "Em progresso", value: "IN_PROGRESS" },
    { name: "Concluído", value: "COMPLETED" },
  ];

  async function onSubmit(data: createTaskSchemaType): Promise<void> {
    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
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
          reset();
          setIsOpen(false);
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
                      {error.message}
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
                      className={styles.createTask}
                    >
                      {isPending ? <LoadingCircleSpinner /> : "Criar tarefa"}
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

export default CreateTaskBtn;
