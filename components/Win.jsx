import React from "react";

const Win = ({ prizes, prizeIndex, restartNext }) => {
  return (
    <div className="absolute lost-background top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#CEB239] text-white p-24 rounded-md text-center">
        <h1 className="text-[64px] pb-10">Nyeremény: {prizes[prizeIndex]}</h1>
        <p className="font-bold text-2xl">
          Gratulálunk meg nyertétek a fődíjat!
        </p>
        <div>
          <p
            onClick={() => restartNext()}
            className="font-bold mt-5 cursor-pointer border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#CEB239]"
          >
            Következő csapat
          </p>
        </div>
      </div>
    </div>
  );
};

export default Win;
