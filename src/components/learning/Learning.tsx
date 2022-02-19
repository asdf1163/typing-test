import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  IdataCategory,
  IlessonSlidePosition,
  Ilesson,
} from "./learning.interfaces";
import "./learning.css";

const Learning = () => {
  const [Category, setCategory] = useState<IdataCategory[]>([
    {
      id: 0,
      categoryName: "Begginer",
      active: true,
    },
    {
      id: 1,
      categoryName: "Intermediate",
      active: false,
    },
    {
      id: 2,
      categoryName: "Advanced",
      active: false,
    },
  ]);

  const lessons: Ilesson[] = [
    {
      id: 0,
      name: "learn F and K",
      subtitles: [{}],
      proggress: 0,
      medals: [{}],
    },
    { id: 1, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 2, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 3, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 4, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 5, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 6, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 7, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 8, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 9, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 10, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 11, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 12, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 13, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
    { id: 14, name: "", subtitles: [{}], proggress: 0, medals: [{}] },
  ];

  let amountOfBoxesDefault = 0;
  const [container, setContainer] = useState<any>([]);
  const [choosedCategory, setChoosedCategory] = useState<number>(0);
  const [lessonSlidesPosition, setLessonSlidesPosition] =
    useState<IlessonSlidePosition>({
      slide: 0,
      position: 0,
    });

  const changeCategory = (idCategory: IdataCategory["id"]) => {
    const tempArray: IdataCategory[] = Category;
    tempArray[choosedCategory].active = false;
    tempArray[idCategory].active = true;
    setChoosedCategory(idCategory);
    setCategory(tempArray);
  };

  const changePosition = {
    moveWindowValue: 100,
    changePosition: function (slidePosition: number, slideNumber: number) {
      return setLessonSlidesPosition({
        ...lessonSlidesPosition,
        slide: slideNumber,
        position: lessonSlidesPosition.position + slidePosition,
      });
    },
    toRight: function () {
      return this.changePosition(
        -this.moveWindowValue,
        lessonSlidesPosition.slide + 1
      );
    },
    toLeft: function () {
      return this.changePosition(
        this.moveWindowValue,
        lessonSlidesPosition.slide - 1
      );
    },
  };

  const buttonValidation = {
    previousSlide: () => {
      if (lessonSlidesPosition.slide === 0) {
        return false;
      } else return true;
    },
    nextSlide: () => {
      if (container.length - 1 <= lessonSlidesPosition.slide) {
        return false;
      } else return true;
    },
  };

  const sliceElements = (minValue: number, maxValue: number) => {
    const newContainer = lessons.slice(minValue, maxValue);
    return newContainer;
  };

  const amountOfBoxesInContainer = () => {
    const windowWidth = window.innerWidth;
    let boxWidth = 300; //px
    let marginInBoxCSS = windowWidth * 0.03;

    const amountOfBoxes = Math.floor(windowWidth / (boxWidth + marginInBoxCSS));
    if (amountOfBoxes !== amountOfBoxesDefault) {
      amountOfBoxesDefault = amountOfBoxes;
      const arrayOfLessons = [];
      const lengthOfLessons = lessons.length;
      for (
        let minValue = 0, maxValue = amountOfBoxes;
        minValue <= lengthOfLessons;
        minValue = maxValue, maxValue += amountOfBoxes
      ) {
        const newContainer = sliceElements(minValue, maxValue);
        if (newContainer.length > 0) {
          arrayOfLessons.push(newContainer);
        }
      }
      setContainer(arrayOfLessons);
      return true;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", amountOfBoxesInContainer);

    return () => {
      window.removeEventListener("resize", amountOfBoxesInContainer);
    };
  }, []);

  useEffect(() => {
    amountOfBoxesInContainer();
  }, []);

  console.log("useState - Container", container);
  return (
    <div className="learning">
      <div className="advanceCategories">
        <div className="advanceCategories__options">
          {Category.map((category) => (
            <button
              className={
                category.active
                  ? "advanceCategories__options--button advanceCategories__options--active"
                  : "advanceCategories__options--button"
              }
              onClick={() => changeCategory(category.id)}
              key={`categoryButton${category.id}`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>
      <div className="lessons">
        {buttonValidation.previousSlide() && (
          <div className="prevSlide">
            <AiOutlineLeft size={50} onClick={() => changePosition.toLeft()} />
          </div>
        )}
        <div
          className="lessons__slider"
          style={{
            transform: `translateX(${lessonSlidesPosition.position}vw)`,
          }}
        >
          {container.map((slide: Ilesson[], index: number) => {
            return (
              <div className="lessons__container" key={`slide${index}`}>
                {slide.map((lesson: { id: Ilesson["id"] }) => {
                  return (
                    <div className="box" key={`box${lesson.id}`}>
                      {lesson.id}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {buttonValidation.nextSlide() && (
          <div className="nextSlide">
            <AiOutlineRight
              size={50}
              onClick={() => changePosition.toRight()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
