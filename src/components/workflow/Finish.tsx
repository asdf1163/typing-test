import React, { useRef } from "react";
import { Iword } from "./interfaces";

interface IpassingProps {
  score: Iword | Iword[];
  typingTime: number;
}

interface Iprop {
  character: object[];
}

const FinishFun = ({ score, typingTime }: IpassingProps): JSX.Element => {
  const countFalseCharacters = useRef<number>(0);
  const countCorrectCharacters = useRef<number>(0);

  const countCorrectness = () => {
    console.log("score", score);
    score.map((word: any) =>
      word.map(
        (character: any) => character.correct === false ? countFalseCharacters.current++ : countCorrectCharacters.current++
      )
    );
    return 0
  };

  const countAverage = () => {
    
    return 0;
  };
  
  const countTime = () => {
    const minute = Math.floor(typingTime/60);
    const second = typingTime%60 > 9? typingTime%60: `0${typingTime%60}`;

    const time = `${minute}:${second}`
    // console.log('minute', minute)
    // console.log('second', second)
    return time;
  };
  
  // countTime()
  countCorrectness()
  return (
    <div>
      Finish
      <p style={{color:"green", fontWeight: 700}}>Correct types: {countCorrectCharacters.current}</p>
      <p style={{color:"red", fontWeight: 700}}>Failed types: {countFalseCharacters.current}</p>
      <p>time: {countTime()}s</p>
    </div>
  );
};

export default FinishFun;
