import styles from "./closeDialogBtn.module.css";

import React, { SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";

const CloseDialogBtn = ({
  setIsOpenDialog,
}: {
  setIsOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={styles.button_close}
      onClick={() => setIsOpenDialog(false)}
    >
      <IoCloseSharp />
    </button>
  );
};

export default CloseDialogBtn;
