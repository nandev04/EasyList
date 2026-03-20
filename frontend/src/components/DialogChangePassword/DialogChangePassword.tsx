import styles from "./dialogChangePassword.module.css";
import { Dialog, DialogPanel } from "@headlessui/react";
import { SetStateAction } from "react";
import CloseDialogBtn from "../closeDialogBtn/CloseDialogBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from "./change-password.schema";
import LoadingCircleSpinner from "../loadingCircleSpinner/LoadingCircleSpinner";
import * as Service from "../../services/auth.service";
import useDelayLoading from "../../hooks/useDelayLoading";

const DialogChangePassword = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { showLoading } = useDelayLoading(isSubmitting, 150);

  async function sendRequest(data: changePasswordSchemaType) {
    try {
      await Service.changePassword(data);
      setOpenDialog(false);
    } catch (err) {
      if (err instanceof Error)
        setError("root", {
          type: "server",
          message: err.message,
        });
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        (reset(), setOpenDialog(false));
      }}
    >
      <div className="overlay">
        <div className="container">
          <DialogPanel className="panel">
            <form className={styles.form} onSubmit={handleSubmit(sendRequest)}>
              <div className={styles.input_container}>
                <label className={styles.label} htmlFor="currentPassword">
                  Insira sua senha atual
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="currentPassword"
                  {...register("currentPassword", {
                    onChange: () => clearErrors("root"),
                  })}
                />
                {errors.currentPassword && (
                  <span className={styles.error_message}>
                    {errors.currentPassword.message}
                  </span>
                )}
              </div>
              <div className={styles.input_container}>
                <label className={styles.label} htmlFor="newPassword">
                  Insira sua nova senha
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <span className={styles.error_message}>
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              {errors.root && (
                <span
                  style={{ marginTop: "-10px" }}
                  className={styles.error_message}
                >
                  {errors.root.message}
                </span>
              )}
              <div className={styles.actions_container}>
                <button
                  type="button"
                  onClick={() => {
                    (reset(), setOpenDialog(false));
                  }}
                  className={styles.cancel_btn}
                >
                  Cancelar alteração
                </button>
                <button type="submit" className={styles.change_btn}>
                  {showLoading ? <LoadingCircleSpinner /> : "Alterar senha"}
                </button>
              </div>
            </form>
            <CloseDialogBtn resetForm={reset} setIsOpenDialog={setOpenDialog} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogChangePassword;
