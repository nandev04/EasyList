import React from "react";
import style from "./loadingTask.module.css";
import { motion, Variants } from "motion/react";

const LoadingTask = () => {
  const dotVariants: Variants = {
    jump: {
      transform: "translateY(-30px)",
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className={style.content_wrapper}>
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className={style.container}
      >
        <motion.div className={style.dot} variants={dotVariants} />
        <motion.div className={style.dot} variants={dotVariants} />
        <motion.div className={style.dot} variants={dotVariants} />
      </motion.div>
    </div>
  );
};

export default LoadingTask;
