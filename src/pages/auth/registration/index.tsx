import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Registration = () => {
  const router = useRouter();
  const [verificationResponse, setVerificationResponse] = useState("");
  const [verificationCode, setVerificationCode] = useState(0);
  const sendVerification = async (code: string | string[]) => {
    try {
      const res = await axios.get(
        `https://134b-62-84-32-239.ngrok-free.app/verification/verify?code=${code}`
      );
      if (res.status === 200) {
        setVerificationResponse("Верификация прошла");
        setVerificationCode(200);
      }
    } catch (err) {
      console.log(err);
      setVerificationResponse("Не получилось верифицировать");
      setVerificationCode(400);
    }
  };
  useLayoutEffect(() => {
    if (router.query.code !== undefined) {
      sendVerification(router.query.code);
    }
  }, [router.query.code]);
  return (
    <div className="w-full h-screen flex justify-center pt-20 bg-slate-100">
      <div className="border-4 bg-white w-96 text-center p-6 rounded-lg h-max flex flex-row space-x-4">
        {verificationCode === 200 ? (
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
        ) : (
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        )}
        <p
          className={`${
            verificationCode === 200 ? "text-green-500" : "text-red-500"
          }`}
        >
          {verificationResponse}
        </p>
      </div>
    </div>
  );
};

export default Registration;
