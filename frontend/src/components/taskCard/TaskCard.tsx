import React from "react";
import styles from "./taskCard.module.css";

const TaskCard = () => {
  return (
    <div className={styles.task_container}>
      <div className={styles.wrapper_card}>
        <h3 className={styles.task_title}>Title</h3>
        <p className={styles.task_description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam alias
          ex nulla cumque minus officiis assumenda odit culpa saepe voluptatibus
          dolores repellendus molestiae sunt, laboriosam architecto molestias
          deleniti esse labore.
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
