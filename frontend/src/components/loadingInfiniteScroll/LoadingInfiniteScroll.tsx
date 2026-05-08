import style from "./loadingInfiniteScroll.module.css";
import { motion, Variants } from "motion/react";

const LoadingInfiniteScroll = () => {
  const dotVariants: Variants = {
    jump: {
      y: -12,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "backOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: 0.15 }}
      className={style.container}
    >
      <motion.div className={style.dot} variants={dotVariants} />
      <motion.div className={style.dot} variants={dotVariants} />
      <motion.div className={style.dot} variants={dotVariants} />
    </motion.div>
  );
};

export default LoadingInfiniteScroll;
