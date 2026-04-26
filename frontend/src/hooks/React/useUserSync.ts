import { useEffect } from "react";
import { useGetUser } from "./useUser";
import { useUserStore } from "../../store/useUserStore";

const useUserSync = () => {
  const { data, isLoading } = useGetUser();
  const setUser = useUserStore((s) => s.setUser);
  const setLoading = useUserStore((s) => s.setLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setUser(data ?? null);
  }, [data, setUser]);
};

export default useUserSync;
