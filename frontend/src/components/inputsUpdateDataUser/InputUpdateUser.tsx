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

const InputUpdateUser = () => {
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);

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
  const [openOtpDialog, setIsOpenOtpDialog] = useState(false);

  const updateUserForm = useForm<updateUserSchemaType>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      username: user?.username,
      email: user?.email,
    },
    resolver: zodResolver(updateUserSchema),
    mode: "onSubmit",
  });
  const email = updateUserForm.watch("email");

  const otpForm = useForm<emailOtpSchemaType>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(emailOtpSchema),
    mode: "onSubmit",
  });

  async function onSubmitUpdate(data: updateUserSchemaType) {
    const changedData: Partial<updateUserSchemaType> = {};
    for (const key in updateUserForm.formState.dirtyFields) {
      changedData[key as keyof updateUserSchemaType] =
        data[key as keyof updateUserSchemaType];
    }

    await Service.updateUser(changedData);

    const { email, ...restData } = changedData;

    if (email) setIsOpenOtpDialog(true);

    updateUser(restData);
    updateUserForm.reset({ ...restData });
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
                {key === "email" && email && email !== user?.email && (
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
            <div className={styles.actionsUpdateUser_container}>
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
      <Dialog open={openOtpDialog} onClose={() => setIsOpenOtpDialog(false)}>
        <div className={styles.overlay}>
          <div className={styles.container}>
            <DialogPanel className={styles.panel}>
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
                    >
                      {otpForm.formState.errors.code.message}
                    </span>
                  )}
                  <div className={styles.actionsOTP_container}>
                    <button className={styles.submit_otp} type="submit">
                      Enviar código
                    </button>
                    <p className={styles.resend_description}>
                      Não recebeu o código?{" "}
                      <button className={styles.resend_btn}>Reenviar</button>
                    </p>
                  </div>
                </form>
              </div>
              <button
                className={styles.button_close}
                onClick={() => {
                  (otpForm.reset(),
                    updateUserForm.reset({ email: user?.email }),
                    setIsOpenOtpDialog(false));
                }}
              >
                <IoCloseSharp />
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default InputUpdateUser;
