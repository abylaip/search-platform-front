import { useRouter } from "next/router";

const AuthCode = () => {
  const router = useRouter();
  return <div>{router.query.code || "ашылу керек"}</div>;
};

export default AuthCode;
