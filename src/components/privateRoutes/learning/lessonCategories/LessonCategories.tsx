import React from "react";
import { Link, useParams } from "react-router-dom";
import { lessons } from "../mockUpData";
import { IoIosLock } from "react-icons/io";
import "./lessonCategories.css";

const LessonCategories = () => {
  const { lessonId }: any = useParams<string>();
  const newId = parseInt(lessonId);
  const iconSizePx = 256;

  console.log(document.location.pathname);

  const handleUrlAdd = () => {
    return 0;
  };
  return (
    lessons[newId] && (
      <div className="lessonCategories">
        <div className="lessonCategories__title">{lessons[newId].name}</div>

        {/* odciąć tutaj */}

        <div className="lessonCategories__options">
          <Link to="lecture">
            <div className="lessonCategories__option">
              <div className="lessonCategories__box">
                <div className="lessonCategories__image">
                  <img
                    src={`https://img.icons8.com/cute-clipart/${iconSizePx}/book.png`}
                    alt="book"
                  />
                </div>
                <div className="lessonCategories__type">Lecture</div>
              </div>
              <div className="lessonCategories__score">1/2</div>
            </div>
          </Link>
          <Link to="practice">
            <div className="lessonCategories__option">
              <div className="lessonCategories__box">
                <div className="lessonCategories__image">
                  <img
                    src={`https://img.icons8.com/external-flaticons-flat-flat-icons/${iconSizePx}/external-keyboard-devices-flaticons-flat-flat-icons-3.png`}
                    alt="keyboard"
                  />
                </div>
                <div className="lessonCategories__type">Practice</div>
              </div>
              <div className="lessonCategories__score">2/6</div>
            </div>
          </Link>
          <Link to="test">
            <div className="lessonCategories__option">
              <div className="lessonCategories__box">
                <div className="lessonCategories__image">
                  {<IoIosLock size={iconSizePx} />}
                </div>
                <div className="lessonCategories__type">Test</div>
              </div>
              <div className="lessonCategories__score">Locked</div>
            </div>
          </Link>
        </div>
      </div>
    )
  );
};

export default LessonCategories;
