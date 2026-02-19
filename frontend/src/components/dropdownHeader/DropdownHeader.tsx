import { MenuSeparator, Popover, PopoverPanel } from "@headlessui/react";
import styles from "./dropdownHeader.module.css";
import { useState } from "react";
import { useUserStore } from "../../store/userSession.store";
import LogoutBtn from "../logoutBtn/LogoutBtn";

const DropdownHeader = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);

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
              user?.avatarUrl
                ? user?.avatarUrl
                : "../../public/assets/user-image.jpg"
            }
            alt="User avatar"
            className={styles.avatar}
          />

          {open && (
            <PopoverPanel static className={styles.panel}>
              <h3 className={styles.username}>{user?.username}</h3>

              <MenuSeparator className={styles.separator} />
              <div className={styles.container_items}>
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
