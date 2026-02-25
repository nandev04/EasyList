import { useState } from "react";
import { useUserStore } from "../../store/userSession.store";
import styles from "./profileOverview.module.css";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
import UploadAvatar from "../uploadAvatar/UploadAvatar";

const ProfileOverview = () => {
  const user = useUserStore((s) => s.user);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openUpdateAvatarDialog, setOpenUpdateAvatarDialog] = useState(false);
  const S3_URL_AVATARS = false;

  console.log(openUpdateAvatarDialog);

  return (
    <>
      <div className={styles.container_avatar}>
        <div className={styles.updateAvatar_wrapper}>
          <div className={styles.avatar_container}>
            <button onClick={() => setOpenAvatarDialog(true)}>
              <img
                className={styles.avatar_image}
                src={
                  user?.avatarKey && S3_URL_AVATARS
                    ? S3_URL_AVATARS + user.avatarKey
                    : "/assets/user-image.jpg"
                }
                alt="Foto de perfil do usuário"
              />
            </button>
            <button onClick={() => setOpenUpdateAvatarDialog(true)}>
              <MdOutlineFlipCameraIos className={styles.camera_icon} />
            </button>
          </div>
        </div>
      </div>
      <h2 className={styles.username}>{user?.username}</h2>
      <Dialog
        open={openAvatarDialog}
        onClose={() => setOpenAvatarDialog(false)}
      >
        <div className={styles.overlay_avatar}>
          <DialogPanel className={styles.panel_avatar}>
            <div className={styles.container_avatar_full}>
              <img
                className={styles.avatar_image_full}
                src={
                  user?.avatarKey && S3_URL_AVATARS
                    ? S3_URL_AVATARS + user.avatarKey
                    : "/assets/user-image.jpg"
                }
                alt="Foto de perfil do usuário"
              />
              <button
                className={styles.button_close_avatar}
                onClick={() => setOpenAvatarDialog(false)}
              >
                <RiCloseFill strokeWidth={0.5} />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog
        open={openUpdateAvatarDialog}
        onClose={() => setOpenUpdateAvatarDialog(false)}
      >
        <div className={styles.overlay_update}>
          <DialogPanel className={styles.panel_update}>
            <DialogTitle>Atualizar Avatar</DialogTitle>
            <UploadAvatar />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileOverview;
