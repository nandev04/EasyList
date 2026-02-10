import React from "react";
import styles from "./containerTask.module.css";

const ContainerTask = ({
  title,
  description,
}: {
  title: string;
  description: string | null;
}) => {
  return (
    <div className={styles.task_container}>
      <div className={styles.wrapper_card}>
        <h3 className={styles.task_title}>{title}</h3>
        <p className={styles.task_description}>{description}</p>
      </div>
    </div>
  );
};

export default ContainerTask;
