import { useState } from "react";
import styles from "./home.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

const Home = () => {
  const [modal, setModal] = useState(false);

  function handleModal() {
    console.log(!modal);
    setModal(!modal);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.user_container}>
          <p className={styles.username}>nandev</p>
          <img
            className={styles.user_photo}
            src="/assets/user-image.jpg"
            alt="Foto de perfil do usuário"
          />
          <button className={styles.btn} onClick={handleModal}>
            <motion.div
              animate={{ rotate: modal ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "anticipate" }}
            >
              <IoIosArrowDown fill={"white"} size={30} />
            </motion.div>
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
