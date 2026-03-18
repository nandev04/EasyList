import React from "react";
import styles from "./fakeCaret.module.css";

const FakeCaret = () => {
  return (
    <div
      className={styles.caret}
      style={{
        position: "absolute",
        width: "1px",
        height: "60%",
        background: "black",
      }}
    />
  );
};

export default FakeCaret;
