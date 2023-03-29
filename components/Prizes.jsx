import React from "react";
import Image from "next/image";

const Prizes = ({ prizes, prizeIndex }) => {
  return (
    <div className="flex flex-col-reverse gap-3 pt-10 pl-10">
      {prizes.map((prize, index) => {
        return (
          <div
            key={index}
            className={`p-2 text-white flex justify-center items-center border-2 border-white rounded-full w-64
            ${prizeIndex == index ? "bg-[#CEB239]" : ""} 
            `}
          >
            <p className="text-3xl flex items-center gap-2">
              {" "}
              <span>
                <Image src="/wine-glass.png" width={24} height={24} alt="" />
              </span>{" "}
              {prize}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Prizes;
