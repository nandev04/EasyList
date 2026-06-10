import { Dialog, DialogPanel } from "@headlessui/react";
import { SetStateAction } from "react";
import FormChangePassword from "./FormChangePassword";

const DialogChangePassword = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <div className="overlay">
        <div className="container">
          <DialogPanel className="panel">
            <FormChangePassword setOpenDialog={setOpenDialog} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogChangePassword;
