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
  console.log(data);

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5 w-full">
        <p className="text-gray-400 cursor-default">
          Главная страница / <span>Поиск дипломных работ</span> /{" "}
          <span className="font-semibold text-accent">Дипломная работа</span>
        </p>
        {userData?.firstName !== undefined ? (
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col space-y-2 rounded-lg bg-white shadow-lg py-5 px-7">
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
            <div>files</div>
          </div>
        ) : (
          <div className="w-full justify-center pt-10">
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
