import InputUpdateUser from "../../components/inputsUpdateDataUser/InputUpdateUser";
import ProfileOverview from "../../components/profileOverview/ProfileOverview";
import { IoArrowBackOutline } from "react-icons/io5";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.container_header}>
            <button
              className={styles.back_btn}
              type="button"
              onClick={() => navigate("/")}
              aria-label="Voltar para página inicial"
            >
              <IoArrowBackOutline />
            </button>
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
