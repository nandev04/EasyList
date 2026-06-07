import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <p className={styles.footer_phrase}>
        © 2026 EasyList · Desenvolvido por nandev
      </p>
      <div className={styles.icons_container}>
        <a href="https://github.com/nandev04">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/nandev04/">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
