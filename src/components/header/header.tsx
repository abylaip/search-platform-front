import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showDropDown]);

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
            <div className="relative">
              <button
                onClick={() => setShowDropDown(true)}
                className="flex flex-row items-center justify-center space-x-2 cursor-pointer"
              >
                <p>Abylay Aiyp</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                ref={dropdownRef}
                className={`flex flex-col border-2 overflow-hidden w-48 rounded-lg absolute z-20 right-3 bg-white top-7 shadow-xl ${
                  showDropDown ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => {
                    setShowDropDown(false);
                    router.push("/profile");
                  }}
                  className="py-2 px-3 text-sm hover:bg-slate-100 hover:text-accent focus:bg-slate-300"
                >
                  Профиль
                </button>
                <button
                  onClick={() => {
                    setShowDropDown(false);
                    router.push("/profile/edit");
                  }}
                  className="py-2 px-3 text-sm hover:bg-slate-100 hover:text-accent focus:bg-slate-300"
                >
                  Редактировать профиль
                </button>
                <button
                  onClick={() => {
                    setShowDropDown(false);
                  }}
                  className="py-2 px-3 text-sm hover:bg-slate-100 hover:text-red-500 focus:bg-slate-300"
                >
                  Выйти
                </button>
              </div>
            </div>
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
