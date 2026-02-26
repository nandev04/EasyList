import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import styles from "./uploadAvatar.module.css";

// CONFIGURAR PREVIEW DE FOTO(LAYOUT), IMPLEMENTAR VALIDAÇÃO COM ZOD DE INPUT, IMPLEMENTAR LÓGICA DE PATCH AVATAR

const UploadAvatar = ({
  setStateDialog,
}: {
  setStateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

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

  async function onSubmit(data: FieldValues) {
    console.log(data.image);
    if (errors) console.log(errors);
    reset();
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
                  <div className={styles.container_deleteIcon}>
                    <IoMdCloseCircleOutline
                      className={styles.delete_icon}
                      onClick={() => {
                        revokeImage(preview);
                        setPreview(null);
                      }}
                    />
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
            disabled={!image?.length}
            className={styles.submit_btn}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadAvatar;
