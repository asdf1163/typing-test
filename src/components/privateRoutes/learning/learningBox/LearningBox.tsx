import React from "react";
import { Ilesson } from "../learning.interfaces";
import "./learningBox.css";
import { FaArrowRight } from "react-icons/fa";
import bronzeMedal from "../../../../media/images/bronze-medal.svg";
import sliverMedal from "../../../../media/images/silver-medal.svg";
import goldMedal from "../../../../media/images/gold-medal.svg";
import { Link } from "react-router-dom";

const LearningBox: React.FC<{ lesson: Ilesson }> = ({ lesson }) => {
  const renderMedal = () => {
    switch (lesson.medal) {
      case "gold": {
        return <img src={goldMedal} alt="goldMedal" title="Golden medal" />;
      }
      case "silver": {
        return <img src={sliverMedal} alt="sliverMedal" title="Silver medal" />;
      }
      case "bronze": {
        return <img src={bronzeMedal} alt="bronzeMedal" title="Bronze medal" />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="lessonBox__box">
      <div className="lessonBox__image">
        <div className="lessonBox__image--description">
          <span className="lessonBox__image--text">
            Test information about contained lessons within lectures and
            practice part
          </span>
        </div>
      </div>
      <div className="lessonBox__information">
        <div className="lessonBox__container">
          <div className="lessonBox__title">{lesson.name}</div>
          <div className="lessonBox__medal">{renderMedal()}</div>
        </div>
        <div className="lessonBox__container">
          <div className="lessonBox__proggress">
            <span>{lesson.proggress}%</span>
            <div className="lessonBox__progrressBar">
              <div
                className="lessonBox__progrressBar--line"
                style={{ width: `${lesson.proggress}%` }}
              ></div>
            </div>
          </div>
          <Link to={`${lesson.id}`}>
            <FaArrowRight size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningBox;
