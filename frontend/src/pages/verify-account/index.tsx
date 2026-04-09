import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyAccountMutation } from "../../hooks/Query/useAuthMutation";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isError, isSuccess } = useVerifyAccountMutation();

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token]);

  if (!token) {
    return <p>Token inválido</p>;
  }

  if (isPending) {
    return <p>Verificando sua conta...</p>;
  }

  if (isError) {
    return <p>Token inválido ou expirado</p>;
  }

  if (isSuccess) {
    return <p>Conta verificada com sucesso!</p>;
  }

  return null;
};

export default VerifyAccount;
