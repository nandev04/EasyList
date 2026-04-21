import { MenuSeparator, Popover, PopoverPanel } from "@headlessui/react";
import styles from "./dropdownHeader.module.css";
import { useState } from "react";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import ProfileBtn from "../profileBtn/ProfileBtn";
import { useGetUser } from "../../hooks/React/useUser";

const DropdownHeader = () => {
  const { data: user } = useGetUser();
  const [open, setOpen] = useState(false);
  const S3_URL_AVATARS = import.meta.env.VITE_S3_URL_AVATARS;

  return (
    <div className={styles.header_container}>
      <Popover className={styles.popoverRoot}>
        <div
          className={styles.triggerWrapper}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen(!open)}
        >
          <img
            src={
              user?.avatarKey
                ? S3_URL_AVATARS + user?.avatarKey
                : "/assets/user-image.jpg"
            }
            onError={(e) => (e.currentTarget.src = "/assets/user-image.jpg")}
            alt="User avatar"
            className={styles.avatar}
          />

          {open && (
            <PopoverPanel static className={styles.panel}>
              <h3 className={styles.username}>{user?.username}</h3>

              <MenuSeparator className={styles.separator} />
              <div className={styles.container_items}>
                <ProfileBtn />
                <LogoutBtn />
              </div>
            </PopoverPanel>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default DropdownHeader;
