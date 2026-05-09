import { FieldValues, UseFormReset } from "react-hook-form";
import styles from "./closeDialogBtn.module.css";

import React, { SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";

const CloseDialogBtn = <T extends FieldValues>({
  resetForm,
  setIsOpenDialog,
}: {
  resetForm: UseFormReset<T>;
  setIsOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={styles.button_close}
      onClick={() => {
        (resetForm(), setIsOpenDialog(false));
      }}
    >
      <IoCloseSharp />
    </button>
  );
};

export default CloseDialogBtn;
