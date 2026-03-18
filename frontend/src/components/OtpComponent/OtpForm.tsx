import { SlotProps } from "input-otp";
import Slot from "./Slot";

const OtpForm = ({ slots }: { slots: SlotProps[] }) => {
  return (
    <div style={{ justifyContent: "center", display: "flex", gap: "8px" }}>
      {slots.map((slot, i) => (
        <Slot key={i} {...slot} />
      ))}
    </div>
  );
};

export default OtpForm;
