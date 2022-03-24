import React, { LegacyRef, useRef } from "react";
import {
  IwordList,
  IKeyboardEvent,
  IcurrentWordID,
  classOptions,
} from "./workflow.interfaces";

interface Iprops {
  wordList: IwordList[][];
  typingTime: number;
  currentHighOfText: number;
  correctKeyPress(event: IKeyboardEvent): void;
  currentWordId: IcurrentWordID;
  positionCurrent: LegacyRef<HTMLSpanElement>;
}

const DisplayTest = ({
  wordList,
  typingTime,
  currentHighOfText,
  correctKeyPress,
  currentWordId,
  positionCurrent,
}: Iprops) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const signOptions = {
    signTemplate: function (
      index: number,
      sign: string,
      classNameProp: classOptions
    ) {
      if (classNameProp === classOptions.current) {
        return (
          <span
            key={`sign${index}`}
            className={classNameProp}
            ref={positionCurrent}
          >
            {sign}
          </span>
        );
      } else {
        return (
          <span key={`sign${index}`} className={classNameProp}>
            {sign}
          </span>
        );
      }
    },
  };

  const renderSign = (
    index: number,
    indexWord: number,
    character: IwordList
  ) => {
    if (currentWordId.word === indexWord && currentWordId.sign === index)
      return signOptions.signTemplate(
        index,
        character.splitedWord,
        classOptions.current
      );
    else if (character.correct === null)
      return signOptions.signTemplate(
        index,
        character.splitedWord,
        classOptions.default
      );
    else if (character.correct === true)
      return signOptions.signTemplate(
        index,
        character.splitedWord,
        classOptions.correct
      );
    else
      return signOptions.signTemplate(
        index,
        character.splitedWord,
        classOptions.wrong
      );
  };

  return (
    <>
      <div className="workflow" onClick={() => inputRef.current?.focus()}>
        <div
          style={{
            transform: `translate(0, -${currentHighOfText}px)`,
          }}
          className="workflow__container"
        >
          {wordList.map((word: IwordList[], indexWord: number): JSX.Element => {
            return (
              <div key={`word${indexWord}`}>
                {word.map(
                  (
                    character: IwordList,
                    indexCharacter: number
                  ): JSX.Element => {
                    return renderSign(indexCharacter, indexWord, character);
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
      {typingTime}
      <input
        autoFocus
        ref={inputRef}
        className="typing--input"
        onKeyDown={(e) => correctKeyPress(e)}
        type="text"
      />
    </>
  );
};

export default DisplayTest;
