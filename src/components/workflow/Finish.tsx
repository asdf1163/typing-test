import React, { useRef } from "react";
import { Iword } from "./interfaces";

interface IpassingProps {
  score: Iword | Iword[];
  typingTime: number;
}

const FinishFun = ({ score, typingTime }: IpassingProps): JSX.Element => {
  const countFalseCharacters = useRef<number>(0);
  const countCorrectCharacters = useRef<number>(0);
  const countSUM = useRef<number>(0);

  const countCorrectness = () => {
    console.log("score", score);
    score.map((word: any) =>
      word.map((character: any) =>
        character.correct === false
          ? countFalseCharacters.current++
          : countCorrectCharacters.current++
      )
    );
    countSUM.current =
      countCorrectCharacters.current + countFalseCharacters.current;
    if (countFalseCharacters.current === 0) countFalseCharacters.current++;
    console.log(countFalseCharacters.current);
    return 0;
  };

  const countAverage = () => {
    const avgWordLength = countSUM.current / score.length;
    const correctTypes = countCorrectCharacters.current/avgWordLength;
    const time = typingTime / 60;
    return Math.round(correctTypes / time);
  };

  const countTime = () => {
    const minute = Math.floor(typingTime / 60);
    const second =
      typingTime % 60 > 9 ? typingTime % 60 : `0${typingTime % 60}`;

    const time = `${minute}:${second}`;
    return time;
  };

  countCorrectness();
  return (
    <div>
      Finish
      <p style={{ color: "green", fontWeight: 700 }}>
        Correct types: {countCorrectCharacters.current}
      </p>
      <p style={{ color: "red", fontWeight: 700 }}>
        Failed types: {countFalseCharacters.current}
      </p>
      <p>AVG: {countAverage()} WPM</p>
      <p>time: {countTime()}s</p>
    </div>
  );
};

export default FinishFun;
