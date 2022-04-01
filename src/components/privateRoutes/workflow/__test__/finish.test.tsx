import { render } from "react-dom";
import Finish, { IpassingProps } from "../Finish";
// import { IKeyboardEvent } from "../workflow.interfaces";

// describe("Addition", () => {
//   it("knows that 2 and 2 make 4", () => {
//     expect(2 + 2).toBe(4);
//   });
// });

function renderFinish(props: Partial<IpassingProps> = {}) {
  const wordList = [
    [
      {
        splitedWord: "A",
        correct: true,
      },
      {
        splitedWord: "l",
        correct: true,
      },
      {
        splitedWord: "a",
        correct: true,
      },
      {
        splitedWord: " ",
        correct: true,
      },
    ],
    [
      {
        splitedWord: "m",
        correct: true,
      },
      {
        splitedWord: "a",
        correct: true,
      },
      {
        splitedWord: " ",
        correct: true,
      },
    ],
    [
      {
        splitedWord: "k",
        correct: true,
      },
      {
        splitedWord: "o",
        correct: true,
      },
      {
        splitedWord: "t",
        correct: true,
      },
      {
        splitedWord: "a",
        correct: true,
      },
    ],
  ];

  const defaultProps: IpassingProps = {
    score: wordList,
    typingTime: 100,
  };

  let container = document.createElement("div");
  return render(
    <Finish
      score={defaultProps.score}
      typingTime={defaultProps.typingTime}
    ></Finish>,
    container,
    () => {}
  );
}

describe("<Finish />", () => {
  test("Should display details about score"),
    () => {
      expect(renderFinish());
    };
});
