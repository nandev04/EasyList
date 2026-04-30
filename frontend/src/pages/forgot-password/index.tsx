import { Outlet } from "react-router-dom";
import styles from "./forgotPassword.module.css";

const ForgotPasswordLayout = () => {
  return (
    <>
      <span className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordLayout;
