import { useEffect, useState } from "react";

const useDelayLoading = (loading: boolean, delayMs: number) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let delayLoading: ReturnType<typeof setTimeout>;
    if (loading) {
      delayLoading = setTimeout(() => {
        setShowLoading(true);
      }, delayMs);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(delayLoading);
  }, [loading]);

  return { showLoading };
};

export default useDelayLoading;
