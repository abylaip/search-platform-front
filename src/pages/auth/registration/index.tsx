import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";

const Registration = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  useLayoutEffect(() => {
    console.log(router.query.code);
  }, []);
  return <div>{router.query.code}</div>;
};

export default Registration;
