import React, { useEffect, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

const UploadAvatar = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const image = watch("image");

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image || image.length === 0) {
      setPreview(null);
      return;
    }

    const file = image[0];
    const URL_IMAGE = URL.createObjectURL(file);

    setPreview(URL_IMAGE);

    return () => URL.revokeObjectURL(file);
  }, [image]);

  async function onSubmit(data: FieldValues) {
    console.log(data.image);
    if (errors) console.log(errors);
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
        />

        {preview && <img src={preview} />}
        <button type="submit" disabled={!image?.length}>
          Enviar!
        </button>
        <button type="submit">Cancelar</button>
      </form>
    </div>
  );
};

export default UploadAvatar;
