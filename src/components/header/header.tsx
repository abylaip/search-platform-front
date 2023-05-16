import { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const menu = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "My contracts",
      to: "/my-contracts",
    },
    {
      name: "Jobs",
      to: "/jobs",
    },
    {
      name: "Notifications",
      to: "/notifications",
    },
  ];

  return (
    <header className="sticky top-0 z-10 py-5 bg-white shadow-lg">
      <Head>
        <title>Search Platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-32 flex w-full space-x-10">
        <p className="text-accent font-bold text-3xl leading-9 cursor-default">
          SP
        </p>
        <div className="w-full flex space-x-20 items-center justify-between text-lg leading-5 text-high-contrast">
          <p className={`${router.pathname === "/" ? "font-semibold" : ""}`}>
            <Link href="/">Дипломные работы</Link>
          </p>
          {isAuth ? (
            <Link href="/profile">
              <div className="flex flex-row items-center justify-center space-x-2 cursor-pointer">
                <Image
                  src="/static/placeholder.png"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                  alt="avatar"
                />
                <p>Abylay Aiyp</p>
              </div>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link
                href="/login"
                className={`${
                  router.pathname === "/login" ? "font-semibold" : ""
                }`}
              >
                Войти
              </Link>
              <p>/</p>
              <Link
                href="/registration"
                className={`${
                  router.pathname === "/registration" ? "font-semibold" : ""
                }`}
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
