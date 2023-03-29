import React, { useState } from "react";

const Answer = ({ a, i, rightAnswerIndex, handleAnswer }) => {
  const [isClicked, setIsCliked] = useState(false);
  const [isRight, setIsRight] = useState(false);

  return (
    <div
      className={`border-2 w-96 text-white border-white rounded-full p-3 flex justify-center items-center hover:bg-white cursor-pointer hover:text-[#133525]
      ${
        isClicked && isRight ? "bg-green-500" : isClicked ? "bg-orange-500" : ""
      }
      `}
      onClick={() => {
        handleAnswer(i);
        setIsCliked(true);
        if (rightAnswerIndex === i + 1) {
          setTimeout(() => {
            setIsRight(true);
          }, 3000);
        }
        setTimeout(() => {
          setIsCliked(false);
          setIsRight(false);
        }, 5000);
      }}
    >
      <p className="text-3xl">{a}</p>
    </div>
  );
};

export default Answer;
