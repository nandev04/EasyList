import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiImageAdd } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./formUploadAvatar.module.css";
import { avatarSchema, avatarSchemaType } from "../schema/avatar.schema";
import LoadingCircleSpinner from "../../../shared/components/ui/LoadingCircleSpinner";
import { useUpdateAvatarMutation } from "../hooks/useUser.mutation";

const FormUploadAvatar = ({
  setStateDialog,
}: {
  setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(avatarSchema),
    mode: "onChange",
  });
  const { mutateAsync, isPending } = useUpdateAvatarMutation();

  const image = watch("image");

  const [preview, setPreview] = useState<string | null>(null);
  const [visibleDeleteIcon, setVisibleDeleteIcon] = useState(false);

  useEffect(() => {
    if (!image || image.length === 0) {
      setPreview(null);
      return;
    }

    const file = image[0];
    const URL_IMAGE = URL.createObjectURL(file);

    setPreview(URL_IMAGE);

    return () => {
      revokeImage(URL_IMAGE);
    };
  }, [image]);

  function revokeImage(urlImage: string) {
    return URL.revokeObjectURL(urlImage);
  }

  async function onSubmit(data: avatarSchemaType) {
    try {
      const formData = new FormData();

      const file = data.image[0];

      formData.append("avatar", file);

      await mutateAsync(formData, {
        onSuccess: () => setStateDialog(false),
      });

      reset();
    } catch (err) {
      setError("root", {
        type: "server",
        message: "Ocorreu um erro ao enviar imagem",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {preview ? (
          <>
            <div className={styles.container_preview}>
              <div
                className={styles.wrapper_preview}
                onMouseEnter={() => setVisibleDeleteIcon(true)}
                onMouseLeave={() => setVisibleDeleteIcon(false)}
              >
                <img
                  className={styles.avatar_preview}
                  src={preview}
                  alt="Prévia do avatar"
                />
                {visibleDeleteIcon && (
                  <div
                    className={styles.container_deleteIcon}
                    onClick={() => {
                      revokeImage(preview);
                      setPreview(null);
                    }}
                  >
                    <IoMdCloseCircleOutline className={styles.delete_icon} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.container_field}>
              <label className={styles.label_upload}>
                <BiImageAdd />
                <input
                  className={styles.input_upload}
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                />
              </label>
            </div>
          </>
        )}

        <div className={styles.actions}>
          <button
            className={styles.cancel_btn}
            type="button"
            onClick={() => {
              (reset(), setStateDialog(false));
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!image?.length || !!errors.image || isPending}
            className={styles.submit_btn}
          >
            {isPending ? <LoadingCircleSpinner /> : "Salvar"}
          </button>
        </div>
        {errors.image && (
          <p className={styles.error_message}>{errors.image.message}</p>
        )}
        {errors.root && (
          <p className={styles.error_message}>{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};

export default FormUploadAvatar;
