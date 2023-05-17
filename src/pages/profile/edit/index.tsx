import { useState } from "react";
import { format } from "date-fns";
import { phoneNumberMask } from "src/utils/phoneNumberMask";
import { useFetch } from "@hooks";
import { IOrganization } from "@types";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    birthDate: "",
    IIN: "",
    phoneNumber: "",
    email: "",
    organization_id: "",
  });
  const { data, error } = useFetch<IOrganization[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/organization`
  );

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = phoneNumberMask(e.target.value);
    if (
      (number[0] === "+" && number.length <= 15) ||
      (number[0] === "8" && number.length <= 14)
    ) {
      setUser({ ...user, phoneNumber: number });
    }
  };

  const handleSubmit = () => {
    const uploadUser = { ...user };
    uploadUser.birthDate = format(new Date(user.birthDate), "dd.MM.yyyy");
    uploadUser.phoneNumber =
      user.phoneNumber[0] === "+"
        ? user.phoneNumber
            .substring(1, user.phoneNumber.length)
            .replace(/\s/g, "")
        : user.phoneNumber
            .substring(2, user.phoneNumber.length)
            .replace(/\s/g, "")
            .replace(/^/, "7");
    console.log(uploadUser);
  };

  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница /{" "}
          <span className="text-gray-400 cursor-default">Профиль / </span>
          <span className="font-semibold text-accent">Редактировать</span>
        </p>
        <section className="rounded-lg bg-white shadow-lg py-5 px-7 flex flex-col space-y-4">
          <h2 className="text-3xl font-bold">Редактировать личные данные</h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col space-y-2">
              <p className="">Ваше имя:</p>
              <input
                type="text"
                placeholder="Введите имя"
                className="w-full p-3 border outline-none rounded-lg"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваша фамилия:</p>
              <input
                type="text"
                placeholder="Введите фамилию"
                className="w-full p-3 border outline-none rounded-lg"
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Дата рождения:</p>
              <input
                type="date"
                placeholder="Введите дату рождения"
                className="w-full p-3 border outline-none rounded-lg"
                onChange={(e) =>
                  setUser({ ...user, birthDate: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваш ИИН:</p>
              <input
                type="text"
                placeholder="Введите ИИН"
                className="w-full p-3 border outline-none rounded-lg"
                value={user.IIN}
                maxLength={12}
                onChange={(e) => setUser({ ...user, IIN: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваш номер телефона:</p>
              <input
                type="tel"
                placeholder="Введите номер телефона"
                className="w-full p-3 border outline-none rounded-lg"
                value={user.phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваш email:</p>
              <input
                type="email"
                placeholder="Введите email"
                className="w-full p-3 border outline-none rounded-lg cursor-not-allowed"
                value={user.email}
                disabled
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваша организация:</p>
              <div className="w-full p-3 border outline-none rounded-lg">
                <select
                  className="w-full outline-none"
                  onChange={(e) =>
                    setUser({ ...user, organization_id: e.target.value })
                  }
                >
                  {!!data &&
                    data.map((item) => (
                      <option value={`${item.id}`} key={`${item.id}`}>
                        {item.nameRu}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div></div>
            <button
              onClick={handleSubmit}
              className="w-full p-3 bg-accent text-white rounded-lg"
            >
              Сохранить
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
