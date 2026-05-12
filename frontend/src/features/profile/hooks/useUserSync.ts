import { useEffect } from "react";
import { useUserStore } from "../../../shared/store/useUserStore";
import { useGetUser } from "./useUser.query";

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
