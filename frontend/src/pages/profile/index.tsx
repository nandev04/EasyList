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

        <section className={styles.section_overview}>
          <ProfileOverview />
        </section>
      </main>
    </>
  );
};

export default Profile;
