import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./FPLayoutPage.module.css";
import { AnimatePresence } from "motion/react";

const ForgotPasswordLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <span onClick={() => navigate("/login")} className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordLayout;
