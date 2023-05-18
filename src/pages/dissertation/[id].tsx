import { useRouter } from "next/router";
import { useFetch } from "@hooks";
import { IDiplomaContent } from "@types";

const DissertationPage = () => {
  const router = useRouter();
  const { data, error } = useFetch<IDiplomaContent>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation/${router.query.id}`
  );

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-3">
        <p className="text-gray-400 cursor-default">
          Главная страница / <span>Поиск дипломных работ</span> /{" "}
          <span className="font-semibold text-accent">Дипломная работа</span>
        </p>
        <section className="flex flex-col space-y-4 rounded-lg bg-white shadow-lg py-5 px-7">
          <p className="text-2xl font-bold text-accent">{data?.name}</p>
          <p className="text-xl">{data?.organizationName}</p>
          <p className="text-xl">
            Категория:{" "}
            <span className="font-semibold text-primary">{data?.category}</span>
          </p>
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Abstract. </span>
              {data?.dissertAbstract}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default DissertationPage;
