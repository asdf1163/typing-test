import React from "react";
import { useParams } from "react-router-dom";
import { lessons } from "../mockUpData";
import "./lessonOptions.css";

const LessonOptions: React.FC<{ type: string }> = ({ type }) => {
  const { lessonId }: any = useParams<string>();
  const newId = parseInt(lessonId);

  const lessonsOptions = [
    {
      done: true,
      title: "lesson1",
      about:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur porro quae rem ipsam deserunt accusantium velit nam dignissimos esse? Numquam nihil cumque voluptatem nulla iure fugit autem impedit dolorem rem.",
    },
    {
      done: false,
      title: "lesson2",
      about:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur porro quae rem ipsam deserunt accusantium velit nam dignissimos esse? Numquam nihil cumque voluptatem nulla iure fugit autem impedit dolorem rem.",
    },
  ];

  const handleSubmit = (lessonIndex: number) => {
    return (window.location.search = `?id=${lessonIndex}`);
  };

  return (
    <div className="lessonOptions">
      <div className="lessonOptions__title">
        <span>{lessons[newId].name}</span>
        <span>{` > `}</span>
        <span>{type}</span>
      </div>
      <div className="lessonOptions__list">
        {lessonsOptions.map((lesson, index) => {
          return (
            <div className="lessonOptions__box" key={`lessonOptionBox${index}`}>
              {lesson.done ? (
                <span className="lessonOptions__box--status">OK</span>
              ) : (
                <span className="lessonOptions__box--status">NIE</span>
              )}
              <div>
                <div className="lessonOptions__box--title"> {lesson.title}</div>
                <div className="lessonOptions__box--about">{lesson.about}</div>
              </div>
              <div className="lessonOptions__box--button">
                <button onClick={() => handleSubmit(index)}>button</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonOptions;
