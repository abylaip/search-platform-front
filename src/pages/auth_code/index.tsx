import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

const AuthCode = () => {
  const router = useRouter();
  // useLayoutEffect(() => {

  // }, [])
  return <div>{router.query.code || "ашылу керек"}</div>;
};

export default AuthCode;
