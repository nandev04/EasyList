import { SlotProps } from "input-otp";
import FakeCaret from "./FakeCaret";
import styles from "./slot.module.css";

const Slot = (props: SlotProps) => {
  return (
    <div
      className={styles.slotChar}
      style={{
        border: props.isActive ? "none" : "1px solid #ccc",
        outline: props.isActive ? "3px solid var(--primary-color)" : "none",
      }}
    >
      {props.char ?? ""}

      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
};

export default Slot;
