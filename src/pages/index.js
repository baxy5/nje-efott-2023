import { useState, useEffect } from "react";
import Answer from "../../components/Answer";
import Questions from "../../components/Question";
import Head from "next/head";
import Lost from "../../components/Lost";
import Start from "../../components/Start";
import Prizes from "../../components/Prizes";
import Next from "../../components/Next";
import Win from "../../components/Win";
import Helpers from "../../components/Helpers";
import End from "../../components/End";
import Image from "next/image";

export default function Home() {
  const [isStart, setIsStart] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [isAudience, setIsAudience] = useState(false);
  const [isTele, setIsTele] = useState(false);
  const [isHalving, setIsHalving] = useState(false);
  const [isHalvingBackg, setHalvingBackg] = useState(false);
  const [teamQuestionsCounter, setTeamQuestionsCounter] = useState(1);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [elapsedTimePhone, setElapsedTimePhone] = useState(0);
  const [isPhoneStart, setIsPhoneStart] = useState(false);
  const [teleDesign, setTeleDesign] = useState(false);

  // Mi az EFOTT pontos helyszine?
  // Mettől meddig tart az EFOTT? jul 12 16
  // Melyik városban található az NJE?

  const questions = [
    {
      1: {
        question: "Hol rendezik meg az EFOTT-ot?",
        answers: [
          "A: Szelidi-tó",
          "B: Balaton",
          "C: Tisza-tó",
          "D: Velencei-tó",
        ],
        rightAnswerIndex: 4,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 0],
      },
      2: {
        question:
          "Mettől meddig tart az EFOTT?",
        answers: [
          "A: Július 12. - 16.",
          "B: Július 10. - 14.",
          "C: Július 13. - 15.",
          "D: Július 12. - 20.",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      3: {
        question: "Melyik városban található az Neumann János Egyetem?",
        answers: ["A: Kecskemét", "B: Budapest", "C: Eger", "D: Debrecen"],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      4: {
        question: "Melyik nem magyar sörmárka?",
        answers: ["A: Soproni", "B: Dreher", "C: Heineken", "D: Borsodi"],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      5: {
        question: "A világ legerősebb sörének mekkora az alkohol százaléka?",
        answers: ["A: 32", "B: 67.5", "C: 67", "D: 55"],
        rightAnswerIndex: 2,
        halving: [0, 3],
      },
      6: {
        question: "Több mint hány éve az EFOTT az egyetemisták builja?",
        answers: [
          "A: több mint 45",
          "B: több mind 40",
          "C: több mint 35",
          "D: több mint 25",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      7: {
        question: "Háziállatot lehet hozni az EFOTT-ra?",
        answers: ["A: Igen", "B: Igen, de csak fél óráig", "C: Igen, ha bárki simogathatja", "D: Nem"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
    },
  ];

  const prizes = [
    "2 sör",
    "2 sör + 1 shot",
    "4 shot",
    "2 sör + 2 shot",
    "5 sör",
    "8 sör",
    "12 sör",
  ];

  // LEJÁR AZ IDO HANDLER
  useEffect(() => {
    if (elapsedTime == 60) {
      setElapsedTime(0);
      setEnd(true);
      setPrizeIndex(0);
    }
  }, [elapsedTime]);

  const currentQuestions = questions[currentTeamIndex];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // COUNTER 60s
  useEffect(() => {
    let timerId = 0;
    if (isStart) {
      timerId = setInterval(() => {
        if (elapsedTime !== 60 && !isAnswerClicked && !isTele) {
          setElapsedTime((prevTime) => prevTime + 1);
        } else {
          setElapsedTime(elapsedTime);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTime, isStart, isAnswerClicked, isTele]);

  //COUNTER 30s -- Phone help
  useEffect(() => {
    let timerId = 0;
    if (isPhoneStart) {
      timerId = setInterval(() => {
        if (elapsedTimePhone !== 30) {
          setElapsedTimePhone((prevTime) => prevTime + 1);
        } else {
          setElapsedTimePhone(elapsedTimePhone);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTimePhone, isPhoneStart]);

  // Answer handler
  function handleAnswer(index) {
    setIsAnswerClicked(true);
    if (currentQuestion.rightAnswerIndex === index + 1) {
      setTimeout(() => {
        setDisplayFlag(true);
        setPrizeIndex((prev) => prev + 1);
      }, 7000);
    } else {
      setTimeout(() => {
        setEnd(true);
        setPrizeIndex(0);
      }, 5000);
    }
  }

  // NEXT QUESTION HANDLER
  function nextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
    setElapsedTime(0);
    setIsTele(false);
    setDisplayFlag(false);
    setIsHalving(false);
    setIsAnswerClicked(false);
  }

  // Next team handler
  function restartNext() {
    setTeamQuestionsCounter((prev) => prev + 1);
    if (questions.length !== teamQuestionsCounter) {
      setCurrentTeamIndex((prev) => prev + 1);
    }
    setCurrentQuestionIndex(1);
    setElapsedTime(0);
    setEnd(false);
    setIsStart(false);
    setIsAnswerClicked(false);
    setDisplayFlag(false);
    setIsAudience(false);
    setIsTele(false);
    setIsHalving(false);
    setHalvingBackg(false);
    setPrizeIndex(0);
    setElapsedTimePhone(0);
    setIsPhoneStart(false);
    setTeleDesign(false);
  }

  // HALVING HANDLER
  function halving() {
    if (isHalving) {
      delete currentQuestion.answers[currentQuestion.halving[0]];
      delete currentQuestion.answers[currentQuestion.halving[1]];
    }
  }

  return (
    <>
      <Head>
        <title>Legyen Ön is Ittas! | NJE</title>
        <meta name="description" content="Legyen Ön is Ittas! | NJE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/beer.png" />
      </Head>
      <main className="cursor-default">
        <div className="text-white text-[40px] flex justify-center items-center gap-10">
          <div>
            <Image src="/hoklogo.png" width={200} height={200} alt="" />
          </div>
        </div>
        {/* IDE LEHET KELL NEGATIV MARGIN */}
        <div className="">
          <div className="grid justify-center">
            {isEnd && <Lost restartHandler={restartNext} />}
            {!isStart && <Start startHandler={setIsStart} isStart={isStart} />}
            {displayFlag && prizes.length !== prizeIndex && (
              <Next
                nextQuestion={nextQuestion}
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {prizes.length === prizeIndex && (
              <Win
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            <div className="flex justify-center items-center text-white">
              <p className="text-[72px]">{60 - elapsedTime}</p>
            </div>
            <Questions q={currentQuestion.question} />
            <div className="grid grid-cols-1 gap-5 px-2">
              {currentQuestion.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    a={answer}
                    i={index}
                    rightAnswerIndex={currentQuestion.rightAnswerIndex}
                    handleAnswer={handleAnswer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
