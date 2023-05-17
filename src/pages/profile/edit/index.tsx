import { useEffect, useState } from "react";

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
  const phoneNumberMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/ /gm, "");
    console.log(val);

    let num = `${val[0] === "+" ? val.substring(0, 2) : val.substring(0, 1)} ${
      val[0] === "+" ? val.substring(2, 5) : val.substring(1, 4)
    } ${val[0] === "+" ? val.substring(5, 8) : val.substring(4, 7)} ${
      val[0] === "+"
        ? val.substring(8, val.length)
        : val.substring(7, val.length)
    }`;

    num = num.trim();
    if (
      (val[0] === "+" && num.length < 16) ||
      (val[0] === "8" && num.length < 15)
    ) {
      setUser({ ...user, phoneNumber: num });
    }
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
                onChange={(e) => phoneNumberMask(e)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваш email:</p>
              <input
                type="email"
                placeholder="Введите email"
                className="w-full p-3 border outline-none rounded-lg"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="">Ваша организация:</p>
              <div className="w-full p-3 border outline-none rounded-lg">
                <select className="w-full outline-none">
                  <option value="" key="">
                    ASd
                  </option>
                  <option value="" key="">
                    ASd
                  </option>
                </select>
              </div>
            </div>
            <div></div>
            <button className="w-full p-3 bg-accent text-white rounded-lg">
              Сохранить
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
