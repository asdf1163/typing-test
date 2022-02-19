import React, { useRef } from "react";
import { Iword } from "./workflow.interfaces";

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
    score.map((word:Iword[]) =>
      word.map((character:Iword) =>
        character.correct === false
          ? countFalseCharacters.current++
          : countCorrectCharacters.current++
      )
    );
    countSUM.current = countCorrectCharacters.current + countFalseCharacters.current;
    console.log(countFalseCharacters.current);
    return 0;
  };

  const countWPM = () => {
    const avgWordLength = countSUM.current / score.length;
    console.log('avgWordLength: ',avgWordLength);
    
    const correctTypes = countCorrectCharacters.current/avgWordLength;
    const time = typingTime / 60;
    return Math.round(correctTypes / time);
  };

  const countAccuracy = () => {
    const avgAccuracy = Math.floor((countCorrectCharacters.current/countSUM.current)*100);
    return avgAccuracy 
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
      <p>AVG: {countWPM()} WPM</p>
      <p>Acc: {countAccuracy()}%</p>
      <p>time: {countTime()}s</p>
    </div>
  );
};

export default FinishFun;
