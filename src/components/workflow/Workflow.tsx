import React, { useEffect, useRef, useState } from "react";
import FinishFun from "./Finish";
import { Iword, IcurrentWordID, KeyboardEvent, KeyAllowed } from "./workflow.interfaces";

const Workflow = () => {
  const [word, setWord] = useState<Iword[]>([]);
  const [currentWordID, setCurrentWordID] = useState<IcurrentWordID>({
    word: 0,
    sign: 0,
  });

  const [startTyping, setStartTyping] = useState(false);
  const [finishTyping, setFinishTyping] = useState(false);

  const [currentHighOfText, setCurrentHighOfText] = useState<
    number | undefined
  >(0);
  const [typingTime, setTypingTime] = useState<number>(0);

  const positionCurrent = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const data =
    // "Zakopane - miasto w południowej Polsce, w województwie małopolskim, siedziba powiatu tatrzańskiego. Największa miejscowość w bezpośrednim otoczeniu Tatr, duży ośrodek sportów zimowych, potocznie nazywany zimową stolicą Polski. W jego granicach administracyjnych znajduje się znaczna część Tatrzańskiego Parku Narodowego (od Doliny Suchej Wody do Doliny Małej Łąki). Według danych GUS z 31 grudnia 2020 r. miasto liczyło 26 846 mieszkańców, będąc tym samym drugim pod względem ludności - po Nowym Targu - miastem Podhala.";
    "Zakopane - miasto w południowej Polsce";
  const dataSplit = data.split(" ");

  const correctKeyPress = (event: KeyboardEvent) => {
    const tempArray = [...word];

    /**
     * Structure below is responsible for handling the key
     * press and move current typing sign in right place
     */

    if (
      event.keyCode === KeyAllowed.BACKSPACE ||
      event.keyCode === KeyAllowed.DELETE
    ) {
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
            sign: word[currentWordID.word - 1].length - 1,
          });
        return setWord(tempArray);
      }
    }

    /**
     * Check if pressed key is allowed in 'enum KeyAllowed'
     */

    if (KeyAllowed[event.keyCode]) {
      setStartTyping(true);

      if (
        word[currentWordID.word][currentWordID.sign].splitedWord === event.key
      ) {
        tempArray[currentWordID.word][currentWordID.sign].correct = true;
        setWord(tempArray);

        if (currentWordID.sign !== word[currentWordID.word].length - 1)
          setCurrentWordID({
            word: currentWordID.word,
            sign: currentWordID.sign + 1,
          });
        else setCurrentWordID({ word: currentWordID.word + 1, sign: 0 });
      } else {
        tempArray[currentWordID.word][currentWordID.sign].correct = false;
        setWord(tempArray);
        if (currentWordID.sign !== word[currentWordID.word].length - 1)
          setCurrentWordID({
            word: currentWordID.word,
            sign: currentWordID.sign + 1,
          });
        else setCurrentWordID({ word: currentWordID.word + 1, sign: 0 });
      }
      if (
        currentWordID.word === word.length - 1 &&
        currentWordID.sign === word[currentWordID.word].length - 1
      ) {
        console.log("Koniec");
        setStartTyping(false);
        return setFinishTyping(true);
      }
    }
  };

  useEffect(() => {
    console.log("data.length", data.length);
    dataSplit.map((dataSign, index) => {
      const splitedData = dataSign.split("");
      if (index !== dataSplit.length - 1) splitedData.push(KeyAllowed[32]);

      return setWord((prevState: Iword[""]) => {
        return [
          ...prevState,
          splitedData.map((splitedData) => ({
            splitedWord: splitedData,
            correct: null,
          })),
        ];
      });
    });
    // eslint-disable-next-line
  }, []);

  const AddToProp = () => {
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
      window.addEventListener("resize", AddToProp);

      return () => {
        window.removeEventListener("resize", AddToProp);
      };
    } else console.log("blad");
  }, [currentWordID.sign, finishTyping]);

  useEffect(() => {
    const timer: any =
      startTyping && setTimeout(() => setTypingTime(typingTime + 1), 1000);
    console.log(timer);
    return () => {
      clearTimeout(timer);
    };
  }, [typingTime, startTyping]);

  return !finishTyping ? (
    <>
      <div className="workflow" onClick={() => inputRef.current?.focus()}>
        <div
          style={{
            transform: `translate(0, -${currentHighOfText}px)`,
          }}
          className="workflow__container"
        >
          {word.map((state, indexWord): JSX.Element => {
            return (
              <div key={`word${indexWord}`}>
                {state.map((character: Iword, index: number): JSX.Element => {
                  return currentWordID.word === indexWord &&
                    currentWordID.sign === index ? (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--current"
                      ref={positionCurrent}
                    >
                      {character.splitedWord.replace(" ", "\u00A0")}
                    </span>
                  ) : character.correct === null ? (
                    <span key={`sign${index}`} className="workflow__sign">
                      {character.splitedWord.replace(" ", "\u00A0")}
                    </span>
                  ) : character.correct === true ? (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--correct"
                    >
                      {character.splitedWord.replace(" ", "\u00A0")}
                    </span>
                  ) : (
                    <span
                      key={`sign${index}`}
                      className="workflow__sign workflow__sign--wrong"
                    >
                      {character.splitedWord.replace(" ", "\u00A0")}
                    </span>
                  );
                })}
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
  ) : (
    <>
      {console.log("update w Finish")}
      <FinishFun score={word} typingTime={typingTime} />
    </>
  );
};

export default Workflow;
