import { useState } from "react";
import { useFetch } from "@hooks";
import { IDiploma } from "@types";

interface Content {
  name: string;
  category: string;
  organizationName: string;
  dissertAbstract: string;
}

const DiplomasPage = () => {
  const [content, setContent] = useState<Content>({
    name: "",
    category: "",
    organizationName: "",
    dissertAbstract: "",
  });
  const { data } = useFetch<IDiploma>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation`
  );

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5 max-h-screen">
        <p className="text-gray-400 cursor-default">
          Главная страница /{" "}
          <span className="font-semibold text-accent">
            Поиск дипломных работ
          </span>
        </p>
        <div className="p-5 flex bg-white rounded-lg shadow-lg h-[700px]">
          <div className="flex-1 flex flex-col pr-2 border-r border-gray-300 overflow-y-scroll">
            {!!data &&
              data.content.map((item, key) => (
                <DiplomaCard
                  key={key}
                  name={item.name}
                  category={item.category}
                  organizationName={item.organizationName}
                  dissertAbstract={item.dissertAbstract}
                  content={content}
                  setContent={setContent}
                />
              ))}
          </div>
          <div
            className={`flex-1 px-5 ${
              content.dissertAbstract ? "visible" : "invisible"
            } flex flex-col space-y-2 h-full overflow-y-scroll overflow-x-hidden max-w-full`}
          >
            <p className="text-xl font-bold">{content.name}</p>
            <p className="text-low-contrast">{content.organizationName}</p>
            <label className="text-primary flex flex-row space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-low-contrast font-medium">
                {content.category}
              </span>
            </label>
            <label className="text-primary flex flex-row space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-low-contrast font-medium">
                1 человек работал на дипломной работой
              </span>
            </label>
            <span className="">
              <span className="font-bold">Abstract. </span>
              {content.dissertAbstract}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const DiplomaCard = ({
  name,
  category,
  organizationName,
  dissertAbstract,
  content,
  setContent,
}: {
  name: string;
  category: string;
  organizationName: string;
  dissertAbstract: string;
  content: any;
  setContent: any;
}) => {
  return (
    <div
      onClick={() => {
        setContent({
          name: name,
          category: category,
          organizationName: organizationName,
          dissertAbstract: dissertAbstract,
        });
      }}
      className={`flex flex-row items-center space-x-5 border-b border-gray-300 px-2 py-4 ${
        name === content.name ? "bg-blue-100" : "bg-white"
      } cursor-pointer`}
    >
      <div>
        <p className="font-semibold text-accent text-lg">{name}</p>
        <p className="text-gray-500">{category}</p>
        <p className="text-gray-500">{organizationName}</p>
      </div>
    </div>
  );
};

export default DiplomasPage;
