import { useState } from "react";
import styles from "../styles/accordion-task.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import ButtonToDo from "./ButtonToDo";

const AccordionTask = () => {
  const [accordion, setAccordion] = useState(false);

  function handleAccordion() {
    setAccordion(!accordion);
  }

  return (
    <div className={styles.container_task}>
      <div className={styles.container_padding}>
        <div className={styles.header_accordion}>
          <h1 className={styles.title_task}>Lorem Ipsum</h1>
          <button className={styles.btn} onClick={handleAccordion}>
            <motion.div
              animate={{
                rotate: accordion ? 180 : 0,
              }}
              transition={{ duration: 0.3, ease: "anticipate" }}
            >
              <IoIosArrowDown fill={"#3C384A"} />
            </motion.div>
          </button>
        </div>
        <div
          className={styles.container_general}
          style={{
            maxHeight: accordion ? "5000px" : 0,
            opacity: accordion ? 1 : 0,
          }}
        >
          <div className={styles.container_content}>
            <p className={styles.description_task}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              doloribus quis magnam facilis, magni natus ipsum labore et
              voluptates similique est porro distinctio culpa. Eum distinctio
              assumenda veritatis repudiandae. Illum. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Placeat ipsa dignissimos animi! In,
              id? Dicta facilis, incidunt qui quo similique nisi nostrum earum
              assumenda, sequi non dolorum doloribus? At, temporibus. Lorem
              ipsum dolor sit, amet consectetur adipisicing elit. Qui eaque illo
              commodi odit voluptas fuga nam dolores soluta animi quam magnam
              exercitationem harum sunt quas quasi, ducimus aliquam ullam neque!
            </p>
          </div>
          <div className={styles.container_buttons}>
            <ButtonToDo type="del" size={30} />
            <ButtonToDo type="modify" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionTask;
