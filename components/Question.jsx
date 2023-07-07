import React from "react";

const Question = ({ q }) => {
  return (
    <div className="flex justify-center items-center text-center text-white p-5 border-b-2 rounded-full mb-5">
      <h1 className="text-xl">{q}</h1>
    </div>
  );
};

export default Question;
