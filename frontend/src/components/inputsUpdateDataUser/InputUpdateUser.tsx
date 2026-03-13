import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./inputUpdateUser.module.css";
import { useUserStore } from "../../store/userSession.store";
import { MdEdit } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GoAlert } from "react-icons/go";
import {
  updateUserSchema,
  updateUserSchemaType,
} from "../../schemas/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Service from "../../services/user.service";

const InputUpdateUser = () => {
  const user = useUserStore((s) => s.user);

  const formConfig = {
    firstname: {
      label: "Nome",
      type: "text",
    },
    lastname: { label: "Sobrenome", type: "text" },
    email: {
      label: "Email",
      type: "email",
    },
    username: {
      label: "Username",
      type: "text",
    },
  } satisfies Record<
    keyof updateUserSchemaType,
    { label: string; type: string }
  >;

  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { dirtyFields, isDirty, errors },
  } = useForm<updateUserSchemaType>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      username: user?.username,
      email: user?.email,
    },
    resolver: zodResolver(updateUserSchema),
    mode: "onSubmit",
  });
  const email = watch("email");

  async function onSubmit(data: updateUserSchemaType) {
    const changedData: Partial<updateUserSchemaType> = {};
    for (const key in dirtyFields) {
      changedData[key as keyof updateUserSchemaType] =
        data[key as keyof updateUserSchemaType];
    }

    const r = await Service.updateUser(changedData);
    console.log(r);

    if (changedData.email) {
      setIsOpen(true);
    }

    setIsEditing(false);
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container_allElements}>
          <div className={styles.container_inputs}>
            {Object.entries(formConfig).map(([key, config]) => (
              <div key={key}>
                <label className={styles.label} htmlFor={key}>
                  {config.label}
                </label>
                <input
                  type={config.type}
                  id={key}
                  autoComplete={key}
                  className={styles.input}
                  disabled={!isEditing}
                  {...register(key as keyof updateUserSchemaType)}
                />
                {key === "email" && email && email !== user?.email && (
                  <span className={styles.email_warning}>
                    <GoAlert />
                    Será necessário confirmar este email
                  </span>
                )}
                {errors && (
                  <span className={styles.error_message}>
                    {errors[key as keyof updateUserSchemaType]?.message}
                  </span>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className={styles.actions_container}>
              <button
                type="submit"
                className={styles.submit_btn}
                disabled={!isDirty}
              >
                Atualizar dados
              </button>
              <button
                className={styles.cancel_btn}
                onClick={() => {
                  (reset(), setIsEditing(false));
                }}
              >
                Cancelar alterações
              </button>
            </div>
          )}
          {!isEditing && (
            <button
              className={styles.edit_btn}
              disabled={isEditing}
              onClick={() => setIsEditing(true)}
            >
              <MdEdit />
            </button>
          )}
        </div>
      </form>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.overlay}>
          <DialogPanel className={styles.panel}>
            <DialogTitle>ISSO AQUI</DialogTitle>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default InputUpdateUser;
