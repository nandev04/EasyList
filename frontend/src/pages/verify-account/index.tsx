import styles from "./verifyAccount.module.css";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyAccountMutation } from "../../hooks/Query/useAuthMutation";
import LoadingCircleSpinner from "../../components/loadingCircleSpinner/LoadingCircleSpinner";
import useDelayLoading from "../../hooks/React/useDelayLoading";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

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
          {isError && (
            <div className={styles.content_container}>
              <MdCancel color="#FF6E6E" />
              <h1 className={styles.status_title}>
                Token inválido ou expirado
              </h1>
              <p className={styles.description}>
                O link de verificação está inválido, clique no botão para enviar
                um novo link para o email registrado.
              </p>
              <button
                onClick={() => console.log("new link")}
                className={styles.btn}
              >
                Solicite um novo link
              </button>
            </div>
          )}
          {isSuccess && (
            <div className={styles.content_container}>
              <RiVerifiedBadgeFill color="var(--primary-color)" />
              <h1 className={styles.status_title}>Conta verificada!</h1>
              <p className={styles.description}>
                Agora você pode voltar e fazer o login normalmente.
              </p>
              <button onClick={() => navigate("/login")} className={styles.btn}>
                Ir para o login
              </button>
            </div>
          )}
          {!token && !isPending && (
            <div className={styles.content_container}>
              <IoAlertCircle color="#F5B800" />
              <h1 className={styles.status_title}>Este link não é válido</h1>
              <p className={styles.description}>
                Não foi possível encontrar um token de verificação nesta página.
              </p>
              <button onClick={() => navigate("/login")} className={styles.btn}>
                Ir para o login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
