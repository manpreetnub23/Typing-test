import React, { useState } from "react";

const Preference = () => {
  const [active, setActive] = useState(0);
  const handleClick = (index) => {
    setActive(index);
  };
  return (
    <div className="flex items-center w-screen justify-center">
      <div className="h-12 w-76 mt-2 p-4 rounded-full bg-gray-700 bg-opacity-15 text-zinc-500 items-center flex">
        <ul className="flex gap-8">
          <li
            className={`hover:text-zinc-300 cursor-pointer ${
              active === 0 && "text-zinc-300"
            }`}
            onClick={() => handleClick(0)}
          >
            🐣 easy
          </li>
          <li
            className={`hover:text-zinc-300 cursor-pointer ${
              active === 1 && "text-zinc-300"
            }`}
            onClick={() => handleClick(1)}
          >
            @ punctuation
          </li>
          <li
            className={`hover:text-zinc-300 cursor-pointer ${
              active === 2 && "text-zinc-300"
            }`}
            onClick={() => handleClick(2)}
          >123 numbers</li>
        </ul>
      </div>
    </div>
  );
};

export default Preference;
