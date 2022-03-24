import React, { useEffect, useRef, useState } from "react";
import FinishFun from "./Finish";
import {
  IwordList,
  IcurrentWordID,
  IKeyboardEvent,
  KeyAllowed,
} from "./workflow.interfaces";
import "./workflow.css";
import DisplayTest from "./DisplayTest";

const Workflow = () => {
  const [wordList, setWordList] = useState<IwordList[][]>([]);
  const [currentWordId, setCurrentWordId] = useState<IcurrentWordID>({
    word: 0,
    sign: 0,
  });

  const [startTyping, setStartTyping] = useState(false);
  const [finishTyping, setFinishTyping] = useState(false);

  const [currentHighOfText, setCurrentHighOfText] = useState<number>(0);
  const [typingTime, setTypingTime] = useState<number>(0);

  const positionCurrent = useRef<HTMLSpanElement>(null);

  const data =
    // "Zakopane - miasto w południowej Polsce, w województwie małopolskim, siedziba powiatu tatrzańskiego. Największa miejscowość w bezpośrednim otoczeniu Tatr, duży ośrodek sportów zimowych, potocznie nazywany zimową stolicą Polski. W jego granicach administracyjnych znajduje się znaczna część Tatrzańskiego Parku Narodowego (od Doliny Suchej Wody do Doliny Małej Łąki). Według danych GUS z 31 grudnia 2020 r. miasto liczyło 26 846 mieszkańców, będąc tym samym drugim pod względem ludności - po Nowym Targu - miastem Podhala.";
    "Zakopane - miasto w południowej Polsce";
  const dataSplit = data.split(" ");

  const handleRemoveSign = () => {
    if (currentWordId.word === 0 && currentWordId.sign === 0) return;
    else {
      wordList[currentWordId.word][currentWordId.sign].correct = null;
      if (currentWordId.sign !== 0) {
        return setCurrentWordId({
          word: currentWordId.word,
          sign: currentWordId.sign - 1,
        });
      } else {
        return setCurrentWordId({
          word: currentWordId.word - 1,
          sign: wordList[currentWordId.word - 1].length - 1,
        });
      }
    }
  };

  const setWordCorrectness = (key: string) => {
    const tempArray = [...wordList];
    checkIfLastSignInWord();

    const keyValidationToWordInsideList =
      wordList[currentWordId.word][currentWordId.sign].splitedWord === key;
    const spaceKeyValidation =
      wordList[currentWordId.word][currentWordId.sign].splitedWord ===
        KeyAllowed.NO_BREAK_SPACE && key === KeyAllowed[32];

    if (keyValidationToWordInsideList || spaceKeyValidation) {
      tempArray[currentWordId.word][currentWordId.sign].correct = true;
    } else {
      tempArray[currentWordId.word][currentWordId.sign].correct = false;
    }
    return setWordList(tempArray);
  };

  const checkIfLastSignInWord = () => {
    if (currentWordId.sign !== wordList[currentWordId.word].length - 1) {
      return setCurrentWordId({
        word: currentWordId.word,
        sign: currentWordId.sign + 1,
      });
    } else {
      return setCurrentWordId({
        word: currentWordId.word + 1,
        sign: 0,
      });
    }
  };

  const detectEndOfTypingTest = () => {
    if (
      currentWordId.word === wordList.length - 1 &&
      currentWordId.sign === wordList[currentWordId.word].length - 1
    ) {
      console.log("Koniec");
      setStartTyping(false);
      return setFinishTyping(true);
    }
  };

  const correctKeyPress = (event: IKeyboardEvent): void => {
    if (
      event.keyCode === KeyAllowed.BACKSPACE ||
      event.keyCode === KeyAllowed.DELETE
    ) {
      return handleRemoveSign();
    }
    if (KeyAllowed[event.keyCode]) {
      if (!startTyping) setStartTyping(true);
      setWordCorrectness(event.key);
      detectEndOfTypingTest();
    }
  };

  const seperateText = () => {
    dataSplit.map((dataSign, index) => {
      const splitedData = dataSign.split("");
      if (index !== dataSplit.length - 1)
        splitedData.push(KeyAllowed.NO_BREAK_SPACE);

      return setWordList((prevState: IwordList[][]) => {
        return [
          ...prevState,
          splitedData.map((splitedData) => ({
            splitedWord: splitedData,
            correct: null,
          })),
        ];
      });
    });
  };

  useEffect(() => {
    console.log("data.length", data.length);
    seperateText();
    // eslint-disable-next-line
  }, []);

  const onResizeWindow = () => {
    console.log("resize");
    return (
      positionCurrent.current?.offsetTop &&
      setCurrentHighOfText(positionCurrent.current?.offsetTop + 4)
    );
  };

  useEffect(() => {
    if (!finishTyping) {
      const tempPosition = positionCurrent.current?.offsetTop;
      tempPosition && setCurrentHighOfText(tempPosition - 4);
      window.addEventListener("resize", onResizeWindow);

      return () => {
        window.removeEventListener("resize", onResizeWindow);
      };
    } else console.log("Koniec -- useEffect");
  }, [currentWordId.sign, finishTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startTyping && setTypingTime(typingTime + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [startTyping, typingTime]);

  return !finishTyping ? (
    <DisplayTest
      wordList={wordList}
      typingTime={typingTime}
      currentHighOfText={currentHighOfText}
      correctKeyPress={correctKeyPress}
      currentWordId={currentWordId}
      positionCurrent={positionCurrent}
    />
  ) : (
    <FinishFun score={wordList} typingTime={typingTime} />
  );
};

export default Workflow;
