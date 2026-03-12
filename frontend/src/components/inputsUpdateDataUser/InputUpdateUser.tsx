import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./inputUpdateUser.module.css";
import { useUserStore } from "../../store/userSession.store";
import { MdEdit } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GoAlert } from "react-icons/go";

const InputUpdateUser = () => {
  const user = useUserStore((s) => s.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { dirtyFields, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.firstName,
      lastname: user?.username,
      email: user?.email,
    },
  });
  const email = watch("email");

  type DataForm = {
    name?: string;
    lastname?: string;
    email?: string;
  };

  async function onSubmit(data: DataForm) {
    const changedData: Partial<DataForm> = {};
    for (const key in dirtyFields) {
      changedData[key as keyof DataForm] = data[key as keyof DataForm];
    }

    if (changedData.email) {
      setIsOpen(true);
    }

    console.log(changedData);
    setIsEditing(false);
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container_allElements}>
          <div className={styles.container_inputs}>
            <div className={styles.container_name}>
              <label className={styles.label} htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                {...register("name")}
                autoComplete="name"
                className={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.container_lastname}>
              <label className={styles.label} htmlFor="lastname">
                Sobrenome
              </label>
              <input
                id="lastname"
                {...register("lastname")}
                autoComplete="family-name"
                className={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.container_email}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                autoComplete="email"
                className={styles.input}
                disabled={!isEditing}
              />
              {email !== user?.email && (
                <span className={styles.email_warning}>
                  <GoAlert />
                  Será necessário confirmar este email
                </span>
              )}
            </div>
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
