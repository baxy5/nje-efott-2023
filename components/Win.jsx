import React from "react";

const Win = ({ prizes, prizeIndex, restartNext }) => {
  return (
    <div className="absolute top-0 left-0 lost-background  w-full h-screen overflow-hidden">
      <div className="bg-[#CEB239] text-white w-full h-screen flex flex-col px-3 justify-center items-center text-center">
        <h1 className="text-[48px] pb-10">
          Nyeremény: {prizes[prizeIndex - 1]}
        </h1>
        <p className="font-bold text-2xl">
          Gratulálunk meg nyertétek a fődíjat!
        </p>
      </div>
    </div>
  );
};

export default Win;
