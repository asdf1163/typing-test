import React, { useEffect, useRef, useState } from "react";
/*
ZROBIĆ SCHEMAT

1. wpisywanie do inputu po literce -> zapobieganie przed ctrl + A -> backspace && przed wklejeniem dużej ilości znaków
2. lista dostepnych znaków (uwzględnić:
    • zmiane spacji na znak specjalny,
    • małe i duże litery,
    • cyfry
    )
3. rozbić elementy
4. ekran koncowy (pobrać react-router-dom)
*/
const Workflow = () => {
  interface Iword {
    [x: string]: any;
    splitedWord: string | string[]| object | object[];
    correct: boolean | null;
  }

  const [word, setWord] = useState<Iword[]>([]);
  const [currentWordID, setCurrentWordID] = useState<number[]>([0, 0]);
  const positionCurrent = useRef<HTMLSpanElement>(null);

  const data =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dicta blanditiis, perferendis ex non esse accusantium quos accusamus, velit, doloribus ducimus quibusdam modi enim veritatis sit! Error quidem sed magni exercitationem impedit illum iusto. Ipsa iusto hic laboriosam?";

  const dataSplit = data.split(" ");

  const correctKeyPress = (event: any) => {
    console.log(word[0][2].splitedWord);
    const tempArray = [...word];
    
    if (event.keyCode === 8 || event.keyCode === 46) {
      word[currentWordID[0]][currentWordID[1]].correct = null;
      // currentWordID[0] !== 0 && currentWordID[1] !== 0 && setCurrentWordID((state) => );
      return setWord(tempArray);
    }

    if (
      (event.keyCode >= 64 && event.keyCode <= 230) ||
      event.keyCode === 32 ||
      event.keyCode === 49
    ) {
      if (word[currentWordID[0]][currentWordID[1]].splitedWord === event.key) {
        // word[currentWordID].correct = true;
        setWord(tempArray);
        // setCurrentWordID((state) => state + 1);
      } else {
        // word[currentWordID].correct = false;
        setWord(tempArray);
        // setCurrentWordID((state) => state + 1);
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
    // for (const dataSign of data) {
    //   setWord((prevState) => {
    //     return [
    //       ...prevState,
    //       {
    //         sign: dataSign !== " " ? dataSign : space,
    //         // sign: dataSign,
    //         correct: null,
    //       },
    //     ];
    //   });
    // }
  }, []);

  return (
    <>
      <div className="workflow">
        <div
          style={{ transform: `translate(0, -${4}px)` }}
          className="workflow__container"
        >
          {word.map((state, index): JSX.Element => {
            return (
              <div key={`word${index}`}>
                {state.map((character:any, index:number): JSX.Element => {
                  return currentWordID[0] === index ? (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--current"
                      ref={positionCurrent}
                    >
                      {character.splitedWord}
                    </span>
                  ) : state.correct === null ? (
                    <span key={`sign${index}`} className="workflow__sign">
                      {character.splitedWord}
                    </span>
                  ) : state.correct === true ? (
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
