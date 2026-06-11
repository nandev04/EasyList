import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../features/profile/services/user.service";

const useBfGuard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePageShow = async (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      try {
        await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: getUser,
          staleTime: 0,
        });
      } catch {
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate, queryClient]);
};

export default useBfGuard;
