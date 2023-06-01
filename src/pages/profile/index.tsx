import Image from "next/image";
import { Switch } from "@ui";
import { ClipLoader } from "react-spinners";
import { DissertationModal } from "@components/dissertation-modal";
import { useState } from "react";
import { useFetch } from "@hooks";
import { IDiploma, IUser } from "@types";
import format from "date-fns/format";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  let user_id =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const { data: user_data, error: user_error } = useFetch<IUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`
  );

  const { data } = useFetch<IDiploma>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation?userOnly=true`
  );

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница /{" "}
          <span className="font-semibold text-accent">Профиль</span>
        </p>
        {user_data ? (
          <>
            <section className="rounded-lg bg-white shadow-lg">
              <div className="py-6 rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="border-b border-gray-300 flex flex-row items-center py-5 px-7">
                <div className="flex-1 flex flex-row items-center space-x-5">
                  <Image
                    src="/static/placeholder.png"
                    width={100}
                    height={100}
                    className="rounded-full w-24 h-24 object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-high-contrast text-xl">
                      {`${user_data?.firstName} ${user_data?.surname}`}
                    </p>
                    <p className="text-gray-500">
                      {user_data?.profile.organization?.nameRu}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-5 px-7 w-full flex flex-row justify-between">
                <p className="text-high-contrast text-lg font-semibold">
                  Показывать свои работы остальным пользователям
                </p>
                <Switch />
              </div>
            </section>
            <section className="rounded-lg bg-white shadow-lg p-7">
              <div className="pb-4 border-b border-gray-300 flex flex-row justify-between items-center">
                <p className="text-primary font-semibold text-xl">
                  Дипломные работы
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-accent"
                >
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              {!!data &&
                data.content.map((item, key) => (
                  <InfoCard
                    key={key}
                    name={item.name}
                    field={item.category}
                    location={item.organizationName}
                    from={format(new Date(item.createdAt), "yyyy")}
                    to={format(new Date(item.modifiedAt), "yyyy")}
                  />
                ))}
            </section>
          </>
        ) : (
          <div className="w-full pt-10 flex flex-row justify-center">
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
      {showModal && (
        <DissertationModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

const InfoCard = ({
  name,
  field,
  location,
  from,
  to,
}: {
  name: string;
  field: string;
  location: string;
  from: string;
  to: string;
}) => {
  return (
    <div className="flex flex-row justify-between py-4 border-b border-gray-300">
      <div>
        <p className="text-high-contrast text-lg font-semibold">{name}</p>
        <p className="text-medium-contrast">{field}</p>
        <p className="text-low-contrast">{location}</p>
      </div>
      <div className="text-high-contrast text-lg font-semibold flex flex-row space-x-1">
        <p>{from}</p>
        <p>-</p>
        <p>{to}</p>
      </div>
    </div>
  );
};

export default Profile;
