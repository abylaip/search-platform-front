import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Registration = () => {
  const router = useRouter();
  const [verificationResponse, setVerificationResponse] = useState("");
  const sendVerification = async () => {
    console.log("sendVer: ", router.query.code);
    const res = await axios.get(
      `https://134b-62-84-32-239.ngrok-free.app/verification/verify?code=${router.query.code}`
    );
    if (res.status === 200) {
      setVerificationResponse("Верификация прошла");
    } else {
      setVerificationResponse("Не получилось верифицировать");
    }
  };
  useEffect(() => {
    console.log(router.query.code);
    sendVerification();
  }, []);
  return (
    <div>
      {verificationResponse} {router.query.code}
    </div>
  );
};

export default Registration;
