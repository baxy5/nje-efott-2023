import React from "react";

const Next = ({ nextQuestion, prizes, prizeIndex, restartNext }) => {
  return (
    <div className="absolute lost-background top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#CEB239] text-white p-24 rounded-md text-center">
        <h1 className="text-[64px] pb-10">Nyeremény: {prizes[prizeIndex]}</h1>
        <p className="font-bold text-2xl">Megjelöljük a következő kérdést?</p>
        <div>
          <p
            onClick={() => nextQuestion()}
            className="font-bold mt-5 cursor-pointer border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#CEB239]"
          >
            Igen
          </p>
          <p
            onClick={() => restartNext()}
            className="font-bold mt-5 cursor-pointer border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#CEB239]"
          >
            Nem
          </p>
        </div>
      </div>
    </div>
  );
};

export default Next;
