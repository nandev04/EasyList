import { useUserStore } from "../../store/userSession.store";
import styles from "./home.module.css";
import { IoIosArrowDown } from "react-icons/io";

const Home = () => {
  const { user } = useUserStore();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.user_container}>
          <p className={styles.username}>{user?.username}</p>
          <img
            className={styles.user_photo}
            src={"/assets/user-image.jpg"}
            alt="Foto de perfil do usuário"
          />
          <button className={styles.btn}>
            <IoIosArrowDown fill={"white"} size={30} />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container_add}></div>
      </main>
    </>
  );
};

export default Home;
