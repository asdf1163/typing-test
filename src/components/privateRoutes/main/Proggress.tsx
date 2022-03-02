import React from "react";
import Chart from "./proggress/Chart";

const Proggress = () => {
  const data = [
    {
      title: "The Best",
      score: 120,
      unit: "WPM",
    },
    {
      title: "Avarage",
      score: 100,
      unit: "WPM",
    },
    {
      title: "No. Types",
      score: 120,
      unit: "Types",
    },
  ];

  return (
    <div className="tiles__proggress">
      <p className="tile__title">Your proggress:</p>
      <div className="tile__proggress--container">
        <Chart />
        <div className="tiles__proggress--score">
          {data.map((score) => (
            <span className="score" key={`score${score.title}`}>
              <span className="score__title">{score.title}</span>
              <span className="score__value">{score.score}</span>
              <span className="score__unit">{score.unit}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proggress;
