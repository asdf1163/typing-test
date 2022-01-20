import React, { useEffect, useRef, useState } from "react";

const Workflow = () => {
  interface Iword {
    [x: string]: any;
    splitedWord: string | string[] | object | object[];
    correct: boolean | null;
  }

  interface IcurrentWordID {
    word: number;
    sign: number;
  }

  const [word, setWord] = useState<Iword[]>([]);
  const [currentWordID, setCurrentWordID] = useState<IcurrentWordID>({
    word: 0,
    sign: 0,
  });
  const positionCurrent = useRef<HTMLSpanElement>(null);

  const data =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dicta blanditiis, perferendis ex non esse accusantium quos accusamus, velit, doloribus ducimus quibusdam modi enim veritatis sit! Error quidem sed magni exercitationem impedit illum iusto. Ipsa iusto hic laboriosam?";

  const dataSplit = data.split(" ");

  const correctKeyPress = (event: any) => {
    const tempArray = [...word];

    if (event.keyCode === 8 || event.keyCode === 46) {
      if (currentWordID.word === 0 && currentWordID.sign === 0) return 0;
      else {
        word[currentWordID.word][currentWordID.sign].correct = null;
        if (currentWordID.sign !== 0)
          setCurrentWordID({
            word: currentWordID.word,
            sign: currentWordID.sign - 1,
          });
        else
          setCurrentWordID({
            word: currentWordID.word - 1,
            sign: word[currentWordID.word-1].length-1,
          });
        return setWord(tempArray);
      }
    }

    if (
      (event.keyCode >= 64 && event.keyCode <= 230) ||
      event.keyCode === 32 ||
      event.keyCode === 49
    ) {
      if (
        word[currentWordID.word][currentWordID.sign].splitedWord === event.key
      ) {
        tempArray[currentWordID.word][currentWordID.sign].correct = true;
        setWord(tempArray);
        if (currentWordID.sign !== word[currentWordID.word].length-1)
          setCurrentWordID({
            word: currentWordID.word,
            sign: currentWordID.sign + 1,
          });
        else setCurrentWordID({ word: currentWordID.word + 1, sign: 0 });
      } else {
        tempArray[currentWordID.word][currentWordID.sign].correct = false;
        setWord(tempArray);
        if (currentWordID.sign !== word[currentWordID.word].length-1 )
          setCurrentWordID({
            word: currentWordID.word,
            sign: currentWordID.sign + 1,
          });
        else setCurrentWordID({ word: currentWordID.word + 1, sign: 0 });
      }
    }
  };
  const space = "\u00A0";

  useEffect(() => {
    for (const dataSign of dataSplit) {
      const splitedData = dataSign.split("");
      splitedData.push(space);

      setWord((prevState): any[] => {
        return [
          ...prevState,
          splitedData.map((splitedData) => ({
            splitedWord: splitedData,
            correct: null,
          })),
        ];
      });
    }
  }, []);

  return (
    <>
      <div className="workflow">
        <div
          style={{ transform: `translate(0, -${4}px)` }}
          className="workflow__container"
        >
          {console.log(currentWordID)}
          {word.map((state, indexWord): JSX.Element => {
            return (
              <div key={`word${indexWord}`}>
                {state.map((character: any, index: number): JSX.Element => {
                  return currentWordID.word === indexWord && currentWordID.sign === index ? (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--current"
                      ref={positionCurrent}
                    >
                      {character.splitedWord}
                    </span>
                  ) : character.correct === null ? (
                    <span key={`sign${index}`} className="workflow__sign">
                      {character.splitedWord}
                    </span>
                  ) : character.correct === true ? (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--correct"
                    >
                      {character.splitedWord}
                    </span>
                  ) : (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--wrong"
                    >
                      {character.splitedWord}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <input autoFocus onKeyDown={(e) => correctKeyPress(e)} type="text" />
    </>
  );
};

export default Workflow;
