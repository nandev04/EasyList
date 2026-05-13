import { useEffect, useState } from "react";

const useDelayLoading = (loading: boolean, delayMs: number) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setShowLoading(loading);
      },
      loading ? delayMs : 0,
    );

    return () => clearTimeout(timeout);
  }, [loading, delayMs]);

  return { showLoading };
};

export default useDelayLoading;
