import React from "react";
import Image from "next/image";

const Start = ({ startHandler, isStart }) => {
  return (
    <div className="absolute lost-background top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#CEB239] text-white p-24 rounded-md text-center">
        <div className="flex justify-center">
          <Image src="/beerlogo.png" width={128} height={128} alt="" />
        </div>
        <h1 className="text-[64px]">Legyen Ön is Ittas!</h1>
        <p
          onClick={() => startHandler(!isStart)}
          className="font-bold mt-5 cursor-pointer border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#CEB239]"
        >
          Start
        </p>
      </div>
    </div>
  );
};

export default Start;
