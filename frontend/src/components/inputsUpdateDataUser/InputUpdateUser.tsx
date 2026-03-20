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
import ResendOtpCodeBtn from "../resendOtpCode/ResendOtpCodeBtn";
import DialogChangePassword from "../DialogChangePassword/DialogChangePassword";
import CloseDialogBtn from "../closeDialogBtn/CloseDialogBtn";

const InputUpdateUser = () => {
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);

  const [isEditing, setIsEditing] = useState(false);
  const [openOtpDialog, setIsOpenOtpDialog] = useState(false);
  const [openPasswordDialog, setIsOpenPasswordDialog] = useState(false);

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

  const otpForm = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(emailOtpSchema),
    mode: "onSubmit",
  });

  const updateUserForm = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      username: user?.username,
      email: user?.email,
    },
    resolver: zodResolver(updateUserSchema),
    mode: "onSubmit",
  });

  const emailInput = updateUserForm.watch("email");

  async function onSubmitUpdate(data: updateUserSchemaType) {
    const changedData: Partial<updateUserSchemaType> = {};
    for (const key in updateUserForm.formState.dirtyFields) {
      changedData[key as keyof updateUserSchemaType] =
        data[key as keyof updateUserSchemaType];
    }

    await Service.updateUser(changedData);

    const { email: emailData, ...restData } = changedData;

    if (emailData) setIsOpenOtpDialog(true);

    updateUser(restData);
    updateUserForm.reset({
      ...updateUserForm.getValues(),
      ...restData,
    });
    setIsEditing(false);
  }

  async function onSubmitOtp(data: emailOtpSchemaType) {
    try {
      const { data: responseData } = await Service.verifyOtpEmailUpdate(data);
      updateUser({ email: responseData.data.newEmail });

      updateUserForm.reset({
        ...updateUserForm.getValues(),
        email: responseData.data.newEmail,
      });
      otpForm.reset();
      setIsOpenOtpDialog(false);
    } catch (err) {
      if (err instanceof Error)
        return otpForm.setError("root", {
          message: err.message,
        });
      console.log(err);
    }
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={updateUserForm.handleSubmit(onSubmitUpdate)}
      >
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
                  {...updateUserForm.register(
                    key as keyof updateUserSchemaType,
                  )}
                />
                {key === "email" &&
                  emailInput &&
                  emailInput !== user?.email && (
                    <span className={styles.email_warning}>
                      <GoAlert />
                      Será necessário confirmar este email
                    </span>
                  )}
                {updateUserForm.formState.errors && (
                  <span className={styles.error_message}>
                    {
                      updateUserForm.formState.errors[
                        key as keyof updateUserSchemaType
                      ]?.message
                    }
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
            <div className={styles.actionsUpdateUser_container}>
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
                        onChange={(value) => {
                          (field.onChange(value), otpForm.clearErrors("root"));
                        }}
                        render={({ slots }) => <OtpSlots slots={slots} />}
                      />
                    )}
                  />
                  {otpForm.formState.errors.code && (
                    <span
                      style={{ display: "block", margin: "7px 0" }}
                      className={styles.error_message}
                    >
                      {otpForm.formState.errors.code.message}
                    </span>
                  )}
                  {otpForm.formState.errors.root && (
                    <span
                      style={{ display: "block", margin: "7px 0" }}
                      className={styles.error_message}
                    >
                      {otpForm.formState.errors.root.message}
                    </span>
                  )}
                  <div className={styles.actionsOTP_container}>
                    <button className={styles.submit_otp} type="submit">
                      Enviar código
                    </button>
                    <ResendOtpCodeBtn
                      callback={() => Service.updateUser({ email: emailInput })}
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
