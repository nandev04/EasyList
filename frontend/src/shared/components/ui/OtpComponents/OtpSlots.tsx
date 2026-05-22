import { SlotProps } from "input-otp";
import Slot from "./Slot";
import styles from "./OtpSlots.module.css";

const OtpSlots = ({ slots }: { slots: SlotProps[] }) => {
  return (
    <div className={styles.slots_container}>
      {slots.map((slot, i) => (
        <Slot key={i} {...slot} />
      ))}
    </div>
  );
};

export default OtpSlots;
