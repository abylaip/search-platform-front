import Image from "next/image";
import { Switch } from "@ui";

const Profile = () => {
  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница /{" "}
          <span className="font-semibold text-accent">Профиль</span>
        </p>
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
                  Abylay Aiyp
                </p>
                <p className="text-gray-500">Software Engineering</p>
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
            <p className="text-primary font-semibold text-xl">Образование</p>
            <button className="text-accent">
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
          <InfoCard
            name="AITU"
            field="Bachelors degree"
            location="Nur-sultan, Kazakhstan"
            from="2020"
            to="2023"
          />
        </section>
      </div>
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
