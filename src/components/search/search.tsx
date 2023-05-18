import { ReactNode, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { DissertationCard } from "@components/dissertation-card";
import { useFetch, useDebounce } from "@hooks";
import { IDiploma, IDiplomaContent } from "@types";

export const SearchWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [filtered, setFiltered] = useState<IDiplomaContent[]>();
  const { data, error } = useFetch<IDiploma>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation?query=${debouncedValue}`
  );

  const exceptPaths = ["/auth/registration", "/login", "/auth_code"];

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setShowSearchInput(false);
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, []);

  useEffect(() => {
    if (searchValue.length > 1) {
      setFiltered(data?.content);
    } else {
      setFiltered([]);
    }
    exceptPaths.includes(router.pathname)
      ? setShowSearchButton(false)
      : setShowSearchButton(true);
  }, [router, searchValue, data]);

  return (
    <div className="relative">
      {showSearchButton && (
        <div
          className={`bg-accent hover:bg-opacity-100 bg-opacity-75 cursor-pointer h-16 w-16 p-3 text-white flex items-center justify-center rounded-full absolute right-32 top-28 ${
            showSearchInput ? "hidden" : "block"
          }`}
          onClick={() => setShowSearchInput(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      )}
      {showSearchInput && (
        <TransitionSearchBar className="bg-accent bg-opacity-50">
          <div className="flex flex-col mt-24 items-center">
            <div className="w-[800px] bg-white rounded-lg flex flex-row items-center px-2">
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                className="rounded-lg p-3 outline-none w-full"
                placeholder="Поиск дипломных работ..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <button
                className={`text-gray-400 ${searchValue ? "block" : "hidden"}`}
                onClick={() => setSearchValue("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {!!filtered ? (
              filtered.map((item, key) => (
                <DissertationCard
                  key={key}
                  name={item.name}
                  category={item.category}
                  organizationName={item.organizationName}
                  dissertAbstract={item.dissertAbstract}
                />
              ))
            ) : (
              <ClipLoader
                color={"#949292"}
                loading={true}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </div>
        </TransitionSearchBar>
      )}
      <div>{children}</div>
    </div>
  );
};

const expandAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(620px, -300px) scale(0);
    border-radius: 50%;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
    border-radius: 0;
  }
`;

const TransitionSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  animation: ${expandAnimation} 0.5s ease-out forwards;
`;
