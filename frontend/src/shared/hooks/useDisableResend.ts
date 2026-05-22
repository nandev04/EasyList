import { useEffect, useState } from "react";

const useDisableResend = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const disabled = secondsLeft > 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  return { secondsLeft, setSecondsLeft, disabled };
};

export default useDisableResend;
