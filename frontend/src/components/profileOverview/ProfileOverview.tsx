import { useUserStore } from "../../store/userSession.store";
import styles from "./profileOverview.module.css";

import React from "react";

const ProfileOverview = () => {
  const user = useUserStore((s) => s.user);
  const S3_URL_AVATARS = false;
  return (
    <>
      <div className={styles.container_avatar}>
        <img
          className={styles.avatar_image}
          src={
            user?.avatarKey && S3_URL_AVATARS
              ? S3_URL_AVATARS + user.avatarKey
              : "/assets/user-image.jpg"
          }
          alt="Foto de perfil do usuário"
        />
      </div>
      <h2 className={styles.username}>{user?.username}</h2>
    </>
  );
};

export default ProfileOverview;
