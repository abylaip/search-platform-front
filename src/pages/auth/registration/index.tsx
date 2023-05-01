import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Registration = () => {
  const router = useRouter();
  const [verificationResponse, setVerificationResponse] = useState("");
  const sendVerification = async (code: string | string[] | undefined) => {
    const res = await axios.get(
      `https://134b-62-84-32-239.ngrok-free.app/verification/verify?code=${code}`
    );
    if (res.status === 200) {
      setVerificationResponse("Верификация прошла");
    } else {
      setVerificationResponse("Не получилось верифицировать");
    }
  };
  useLayoutEffect(() => {
    sendVerification(router.query.code);
  }, []);
  return <div>{verificationResponse}</div>;
};

export default Registration;
