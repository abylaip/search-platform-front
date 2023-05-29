import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { useFetch } from "@hooks";
import { IDiplomaContent, IUser } from "@types";

const DissertationPage = () => {
  const router = useRouter();
  const { data } = useFetch<IDiplomaContent>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation/${router.query.id}`
  );
  const { data: userData } = useFetch<IUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${data?.createdBy}`
  );
  console.log(userData);

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница / <span>Поиск дипломных работ</span> /{" "}
          <span className="font-semibold text-accent">Дипломная работа</span>
        </p>
        {userData ? (
          <section className="flex flex-col space-y-2 rounded-lg bg-white shadow-lg py-5 px-7">
            <p className="text-xl font-thin">{`${userData?.firstName} · ${userData?.surname} · ${userData?.email}`}</p>
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
          </section>
        ) : (
          <ClipLoader
            color={"#7a7777"}
            loading={true}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </>
  );
};

export default DissertationPage;
