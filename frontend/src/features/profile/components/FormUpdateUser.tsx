import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styles from "./formUpdateUser.module.css";
import { MdEdit } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GoAlert } from "react-icons/go";
import {
  updateUserSchema,
  updateUserSchemaType,
} from "../schema/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogChangePassword from "./DialogChangePassword";
import CloseDialogBtn from "../../../shared/components/CloseDialogBtn";
import {
  otpSchema,
  otpSchemaType,
} from "../../../shared/schema/otpCode.schema";
import { useUserStore } from "../../../shared/store/useUserStore";
import { useUpdateUserMutation } from "../hooks/useUser.query";
import FormConfirmEmailOtp from "./FormConfirmEmailOtp";
import * as Service from "../services/user.service";

const FormUpdateUser = () => {
  const user = useUserStore((s) => s.user);
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();

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
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });

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

  const emailInput = useWatch<updateUserSchemaType, "email">({
    control: updateUserForm.control,
    name: "email",
  });

  async function onSubmitUpdate(data: updateUserSchemaType) {
    const changedData: Partial<updateUserSchemaType> = {};
    for (const key in updateUserForm.formState.dirtyFields) {
      changedData[key as keyof updateUserSchemaType] =
        data[key as keyof updateUserSchemaType];
    }

    await updateUserMutation(changedData);

    const { email: emailData, ...restData } = changedData;

    if (emailData) setIsOpenOtpDialog(true);

    updateUserMutation(restData);
    updateUserForm.reset({
      ...updateUserForm.getValues(),
      ...restData,
    });
    setIsEditing(false);
  }

  async function onSubmitOtp(data: otpSchemaType) {
    try {
      const { data: responseData } = await Service.verifyOtpEmailUpdate(data);
      updateUserMutation({ email: responseData.data.newEmail });

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
                  updateUserForm.reset();
                  setIsEditing(false);
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

              <FormConfirmEmailOtp
                otpUseForm={otpForm}
                callbackOtp={onSubmitOtp}
                callbackResend={updateUserMutation}
                emailInput={emailInput}
              />
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

export default FormUpdateUser;
