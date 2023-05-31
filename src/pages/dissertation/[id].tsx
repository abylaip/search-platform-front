import { useState } from "react";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { useFetch } from "@hooks";
import { IDiplomaContent, IUser } from "@types";
import Cookies from "js-cookie";

const DissertationPage = () => {
  const router = useRouter();
  const { data } = useFetch<IDiplomaContent>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation/${router.query.id}`
  );

  const { data: userData } = useFetch<IUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${data?.createdBy}`,
    undefined,
    {
      flag: true,
      data: data?.id,
    }
  );

  const downloadFile = (filename: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fs/download?filename=${filename}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    )
      .then((response: Response) => {
        const filename = response.headers
          .get("Content-Disposition")
          ?.split("filename=")[1];
        return response.blob().then((blob: Blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.download = filename || "file.pdf"; // Specify the desired file name or fallback to a default name
          link.click();
        });
      })
      .catch((error: Error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5 w-full">
        <p className="text-gray-400 cursor-default">
          Главная страница / <span>Поиск дипломных работ</span> /{" "}
          <span className="font-semibold text-accent">Дипломная работа</span>
        </p>
        {userData?.firstName !== undefined ? (
          <div className="flex flex-row space-x-5 rounded-lg bg-white shadow-lg py-5 px-7">
            <div className="flex-1 flex flex-col space-y-2">
              <p className="font-thin">{`${userData?.firstName} · ${userData?.surname} · ${userData?.email}`}</p>
              <p className="text-2xl font-bold text-accent">{data?.name}</p>
              <p className="text-lg">{data?.organizationName}</p>
              <p className="text-lg">
                Категория:{" "}
                <span className="font-semibold text-primary">
                  {data?.category}
                </span>
              </p>
              <div className="flex flex-col">
                <p>
                  <span className="font-bold">Abstract. </span>
                  {data?.dissertAbstract}
                </p>
              </div>
            </div>
            <div className="flex-1 pt-8 w-full">
              <table className="table-fixed w-full">
                <tbody>
                  <tr className="mb-4">
                    <td>
                      <p className="text-center">Название</p>
                    </td>
                    <td>
                      <p className="text-center">Тип файла</p>
                    </td>
                    <td>
                      <p className="text-center">Скачать</p>
                    </td>
                  </tr>
                  {data?.files.map((item, key) => (
                    <tr
                      key={key}
                      className="pb-3 border-b border-gray-100 border-spacing-4"
                    >
                      <td>
                        <p className="text-center">{item.name}</p>
                      </td>
                      <td>
                        <p className="text-center">{item.mimeType}</p>
                      </td>
                      <td className="flex justify-center">
                        <button
                          onClick={() => downloadFile(item.name)}
                          className="text-blue-500"
                        >
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
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center pt-10">
            <ClipLoader
              color={"#7a7777"}
              loading={true}
              size={35}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DissertationPage;
