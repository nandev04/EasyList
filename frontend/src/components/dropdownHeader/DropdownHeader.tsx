import { MenuSeparator, Popover, PopoverPanel } from "@headlessui/react";
import styles from "./dropdownHeader.module.css";
import { useState } from "react";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import ProfileBtn from "../profileBtn/ProfileBtn";
import { useUserStore } from "../../store/useUserStore";

const DropdownHeader = () => {
  const user = useUserStore((s) => s.user);
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
            src={user?.signedUrlAvatar ?? "/assets/user-image.jpg"}
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
