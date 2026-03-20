import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import {
  emailOtpSchema,
  emailOtpSchemaType,
} from "../../schemas/EmailOtp.schema";
import { OTPInput } from "input-otp";
import OtpSlots from "../OtpComponent/OtpSlots";
import { IoCloseSharp } from "react-icons/io5";
import ResendOtpCodeBtn from "../resendOtpCode/ResendOtpCodeBtn";
import DialogChangePassword from "../DialogChangePassword/DialogChangePassword";
import CloseDialogBtn from "../closeDialogBtn/CloseDialogBtn";

const InputUpdateUser = () => {
  const user = useUserStore((s) => s.user);
  const [isEditing, setIsEditing] = useState(false);
  const [openOtpDialog, setIsOpenOtpDialog] = useState(false);
  const [openPasswordDialog, setIsOpenPasswordDialog] = useState(false);

  const otpForm = useForm();
  const updateUserForm = useForm({
    defaultValues: {
      name: user?.firstname,
      lastname: user?.username,
      email: user?.email,
    },
  });
  const email = updateUserForm.watch("email");

  type DataForm = {
    name?: string;
    lastname?: string;
    email?: string;
  };

  async function sendRequestUpdate(data: DataForm) {
    const changedData: Partial<DataForm> = {};
    for (const key in updateUserForm.formState.dirtyFields) {
      changedData[key as keyof DataForm] = data[key as keyof DataForm];
    }

    if (changedData.email) {
      setIsOpenOtpDialog(true);
    }

    setIsEditing(false);
  }

  function onSubmitOtp() {}

  return (
    <>
      <form
        className={styles.form}
        onSubmit={updateUserForm.handleSubmit(sendRequestUpdate)}
      >
        <div className={styles.container_allElements}>
          <div className={styles.container_inputs}>
            <div className={styles.container_name}>
              <label className={styles.label} htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                {...updateUserForm.register("name")}
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
                {...updateUserForm.register("lastname")}
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
                {...updateUserForm.register("email")}
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
                disabled={!updateUserForm.formState.isDirty}
              >
                Atualizar dados
              </button>
              <button
                className={styles.cancel_btn}
                onClick={() => {
                  (updateUserForm.reset(), setIsEditing(false));
                }}
              >
                Cancelar alterações
              </button>
            </div>
          )}
          {!isEditing && (
            <div className={styles.container_actionsEdit}>
              <button
                onClick={() => setIsOpenPasswordDialog(true)}
                className={styles.changePasswordBtn}
              >
                Alterar senha
              </button>
              <button
                className={styles.edit_btn}
                disabled={isEditing}
                onClick={() => setIsEditing(true)}
              >
                <MdEdit />
              </button>
            </div>
          )}
        </div>
      </form>
      <Dialog open={openOtpDialog} onClose={() => setIsOpenOtpDialog(false)}>
        <div className="overlay">
          <div className="container">
            <DialogPanel className="panel">
              <DialogTitle className={styles.title}>
                Insira o código único
              </DialogTitle>
              <p className={styles.description}>
                Enviamos um código de 6 dígitos para o e-mail informado. Use-o
                para confirmar a alteração.
              </p>

              <div className={styles.container_inputOtp}>
                <form onSubmit={otpForm.handleSubmit(onSubmitOtp)}>
                  <Controller
                    name="code"
                    control={otpForm.control}
                    render={({ field }) => (
                      <OTPInput
                        name="code"
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        render={({ slots }) => <OtpSlots slots={slots} />}
                      />
                    )}
                  />
                  {otpForm.formState.errors.code && (
                    <span
                      style={{ display: "block", margin: "7px 0" }}
                      className={styles.error_message}
                    ></span>
                  )}
                  <div className={styles.actionsOTP_container}>
                    <button className={styles.submit_otp} type="submit">
                      Enviar código
                    </button>
                    <ResendOtpCodeBtn
                      callback={() => Service.updateUser({ email })}
                    >
                      Reenviar
                    </ResendOtpCodeBtn>
                  </div>
                </form>
              </div>
              <CloseDialogBtn
                resetForm={updateUserForm.reset}
                setIsOpenDialog={setIsOpenOtpDialog}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <DialogChangePassword
        openDialog={openPasswordDialog}
        setOpenDialog={setIsOpenPasswordDialog}
      />
    </>
  );
};

export default InputUpdateUser;
