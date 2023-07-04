import React from "react";

const Lost = ({ restartHandler }) => {
  return (
    <div className="absolute lost-background top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="bg-[#CEB239] text-white flex justify-center items-center h-screen w-full">
        <h1 className="text-[48px] text-center pb-5">Sajnálom nem nyertél!</h1>
        {/* <p onClick={() => restartHandler()} className="font-bold cursor-pointer border-2 border-white rounded-full p-2 hover:bg-white hover:text-[#CEB239]">
          Következő csapat
        </p> */}
      </div>
    </div>
  );
};

export default Lost;
