import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const registrationRequest = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
          agreement: true,
        }
      );
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1 container 2xl:w-4/5 flex items-center justify-center h-full pt-36">
          <div className="flex flex-col space-y-4 rounded-lg bg-white p-10 xl:w-11/12 monic:w-8/12 shadow-lg">
            <div className="flex flex-col space-y-2">
              <p className="text-low-contrast text-sm leading-4 font-semibold">
                Email*
              </p>
              <input
                type="email"
                placeholder="Введите email"
                className="rounded-md border border-gray-300 p-2"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-low-contrast text-sm leading-4 font-semibold">
                Пароль*
              </p>
              <input
                type="password"
                placeholder="Введите пароль"
                className="rounded-md border border-gray-300 p-2"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-low-contrast text-sm leading-4 font-semibold">
                Повторите пароль*
              </p>
              <input
                type="password"
                placeholder="Введите пароль"
                className="rounded-md border border-gray-300 p-2"
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={registrationRequest}
                className="bg-accent rounded-md w-full py-3 text-white font-semibold leading-5"
              >
                Регистрация
              </button>
              <Link
                href="/login"
                className="border border-accent rounded-md w-full py-3 text-accent font-semibold leading-5 text-center"
              >
                Зайти через OAuth2
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center p-20">
          <Image
            src="/static/register-image.svg"
            width={494}
            height={494}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Register;
