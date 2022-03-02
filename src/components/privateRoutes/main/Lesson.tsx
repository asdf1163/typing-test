import React from "react";
import { Link } from "react-router-dom";

const Lesson = () => {
  return (
    <div className="tiles__lesson">
      <p className="tile__title">Continue a lesson:</p>
      <div className="lesson">
        <div className="lesson__proggress">
          <span className="lesson__proggress--information">
            <div className="lesson__proggress--title">J,K lesson</div>
            <span className="lesson__proggress--percent">60%</span>
          </span>
          <div className="lesson__proggress__line">
            <div className="lesson__proggress__line--result" />
          </div>
        </div>
        <div className="lesson__button">
          <Link to="/learn">
            <button className="lesson__button--button">PLAY</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
