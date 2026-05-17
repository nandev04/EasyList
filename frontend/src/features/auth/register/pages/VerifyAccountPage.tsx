import styles from "./verifyAccount.module.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingCircleSpinner from "../../../../shared/components/ui/LoadingCircleSpinner";
import useDelayLoading from "../../../../shared/hooks/useDelayLoading";
import TokenError from "../components/TokenError";
import TokenSuccess from "../components/TokenSuccess";
import TokenNotFound from "../components/TokenNotFound";
import { useVerifyAccountMutation } from "../hooks/useVerifyAccount.mutation";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { mutate, isPending, isError, isSuccess } = useVerifyAccountMutation();
  const { showLoading } = useDelayLoading(isPending, 200);

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  return (
    <>
      <span className={styles.logo}>
        Easy<span className={styles.contrast_logo}>List</span>
      </span>
      <div className={styles.base}>
        <div className={styles.general_container}>
          {showLoading && (
            <div className={styles.content_loading}>
              <LoadingCircleSpinner />
            </div>
          )}
          {isSuccess && <TokenSuccess />}
          {isError && <TokenError />}
          {!token && !isPending && <TokenNotFound />}
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
