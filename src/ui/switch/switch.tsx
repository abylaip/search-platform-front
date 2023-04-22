import { useState } from "react";

export const Switch = () => {
  const [toggle, setToggle] = useState(false);
  const toggleClass = "transform -translate-x-6";
  return (
    <div
      className={`md:w-14 md:h-7 w-12 h-6 flex items-center justify-end rounded-full p-1 cursor-pointer ${
        toggle ? "bg-accent" : "bg-gray-400"
      }`}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <div
        className={
          "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
          (toggle ? null : toggleClass)
        }
      ></div>
    </div>
  );
};
