import CreateTaskBtn from "../../components/createTaskBtn/createTaskBtn";
import { useUserStore } from "../../store/userSession.store";
import styles from "./home.module.css";

const Home = () => {
  const { user } = useUserStore();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <img
            className={styles.user_photo}
            src={"/assets/user-image.jpg"}
            alt="Foto de perfil do usuário"
          />
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.welcome_title}>
          <span>Olá</span>, {user?.firstName}!
        </h1>
        <section className={styles.tasks_section}>
          <div className={styles.container_section}>
            <CreateTaskBtn />
            <div>
              <h1>teste</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
