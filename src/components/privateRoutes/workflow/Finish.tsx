import React, { useRef } from "react";
import { useCallback } from "react";
import {
  IcountCorrectnessOfCharacters,
  IwordList,
} from "./workflow.interfaces";

export interface IpassingProps {
  score: IwordList[][];
  typingTime: number;
}

const Finish = ({ score, typingTime }: IpassingProps): JSX.Element => {
  const characterTypes = useRef<IcountCorrectnessOfCharacters>({
    correctType: 0,
    falseType: 0,
    sumType: 0,
  });

  const countCorrectness = useCallback(() => {
    console.log("score", score);
    score.map((word: IwordList[]) => {
      console.log("word", word);
      return word.map((character: IwordList) =>
        character.correct === false
          ? characterTypes.current.falseType++
          : characterTypes.current.correctType++
      );
    });
    characterTypes.current.sumType =
      characterTypes.current.falseType + characterTypes.current.correctType;
  }, [score]);

  const countWPM = () => {
    const avgWordLength = characterTypes.current.sumType / score.length;
    console.log("avgWordLength: ", avgWordLength);

    const correctTypes = characterTypes.current.correctType / avgWordLength;
    const time = typingTime / 60;
    return Math.round(correctTypes / time);
  };

  const countAccuracy = () => {
    const avgAccuracy = Math.floor(
      (characterTypes.current.correctType / characterTypes.current.sumType) *
        100
    );
    return avgAccuracy;
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
        Correct types: {characterTypes.current.correctType}
      </p>
      <p style={{ color: "red", fontWeight: 700 }}>
        Failed types: {characterTypes.current.falseType}
      </p>
      <p>AVG: {countWPM()} WPM</p>
      <p>Acc: {countAccuracy()}%</p>
      <p>time: {countTime()}s</p>
    </div>
  );
};

export default Finish;
