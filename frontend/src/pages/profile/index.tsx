import InputUpdateUser from "../../components/inputsUpdateDataUser/InputUpdateUser";
import ProfileOverview from "../../components/profileOverview/ProfileOverview";
import { useUserStore } from "../../store/userSession.store";
import styles from "./profile.module.css";
import React from "react";

const Profile = () => {
  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.container_header}>
            <h1 className={styles.title}>
              <span>My</span> Profile
            </h1>
            <span className={styles.decorator}></span>
          </div>
        </header>

        <section className={styles.overview_section}>
          <ProfileOverview />
        </section>
        <section className={styles.personal_section}>
          <div className={styles.container_subtitle}>
            <h2 className={styles.subtitle}>Personal information</h2>
            <span className={styles.decorator}></span>
          </div>
          <div className={styles.container_inputs}>
            <InputUpdateUser />
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
