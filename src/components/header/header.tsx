import { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(true);

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
        <Link href="/" className="text-accent font-bold text-3xl leading-9">
          SP
        </Link>
        <div className="w-full flex space-x-20 items-center justify-between text-lg leading-5 text-high-contrast">
          <p
            className={`${
              router.pathname === "/diplomas" ? "font-semibold" : ""
            }`}
          >
            <Link href="/diplomas">Дипломные работы</Link>
          </p>
          {isAuth ? (
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
          ) : (
            <div className="flex space-x-2">
              <Link
                href="/login"
                className={`${
                  router.pathname === "/login" ? "font-semibold" : ""
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
