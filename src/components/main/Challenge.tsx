import React from "react";
import { MdDone } from "react-icons/md";

const Challenge = () => {
  interface IdataProps {
    name: string;
    type: string;
    amount: number;
    maxAmount: number;
    isDone: boolean;
  }

  const data: IdataProps[] = [
    {
      name: "Get over 60 WPM",
      type: "percent",
      amount: 60,
      maxAmount: 100,
      isDone: false,
    },
    {
      name: "Play games 3 days in a row",
      type: "count",
      amount: 1,
      maxAmount: 3,
      isDone: false,
    },
    {
      name: "Finish a lesson",
      type: "percent",
      amount: 100,
      maxAmount: 100,
      isDone: true,
    },
  ];

  const countPercent = (
    amount: IdataProps["amount"],
    maxAmount: IdataProps["maxAmount"]
  ) => {
    const avgPercent = (amount * 100) / maxAmount;
    return { width: `${Math.round(avgPercent)}%` };
  };

  return (
    <div className="tile__challenge">
      <p className="tile__title">Monthly challenge: </p>
      <div className="challenge">
        {data.map((challenge) => (
          <div
            className={
              challenge.isDone
                ? "challenge__proggress--passed"
                : "challenge__proggress"
            }
            key={challenge.name}
          >
            {challenge.isDone && <MdDone size={40} style={{ position: "absolute" }} />}
            <span className="challenge__proggress--information">
              <div className="challenge__proggress--title">
                {challenge.name}
              </div>
              <span className="challenge__proggress--percent">
                {challenge.type === "percent"
                  ? `${challenge.amount}%`
                  : `${challenge.amount}/${challenge.maxAmount}`}
              </span>
            </span>
            <div
              className={
                challenge.isDone
                  ? "challenge__proggress__line challenge__proggress__line--passed"
                  : "challenge__proggress__line"
              }
            >
              {!challenge.isDone && (
                <div
                  className="challenge__proggress__line--resault"
                  style={
                    challenge.type === "percent"
                      ? {
                          width: `${challenge.amount}%`,
                        }
                      : countPercent(challenge.amount, challenge.maxAmount)
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenge;
