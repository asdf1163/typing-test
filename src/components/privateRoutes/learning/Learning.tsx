import React, { useState, useEffect, useCallback } from "react";
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

  const [amountOfBoxesDefault, setAmountOfBoxesDefault] = useState(0);
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
    changePosition: function (slideNumber: number, slidePosition: number) {
      return setLessonSlidesPosition({
        ...lessonSlidesPosition,
        slide: slideNumber,
        position: lessonSlidesPosition.position + slidePosition,
      });
    },
    toRight: function () {
      return this.changePosition(
        lessonSlidesPosition.slide + 1,
        -this.moveWindowValue
      );
    },
    toLeft: function () {
      return this.changePosition(
        lessonSlidesPosition.slide - 1,
        this.moveWindowValue
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

  const sliceElements = useCallback(
    (minValue: number, maxValue: number) => {
      const newContainer = lessons.slice(minValue, maxValue);
      return newContainer;
    },
    [lessons]
  );

  const amountOfBoxesInContainer = useCallback(() => {
    const windowWidth = window.innerWidth;
    let boxWidth = 300; //px
    let marginInBoxCSS = windowWidth * 0.03;

    const amountOfBoxes = Math.floor(windowWidth / (boxWidth + marginInBoxCSS));
    if (amountOfBoxes !== amountOfBoxesDefault) {
      setAmountOfBoxesDefault(amountOfBoxes);
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
  }, [amountOfBoxesDefault, lessons, sliceElements]);

  const changeAmountOfDisplayedBoxes = useCallback(() => {
    amountOfBoxesInContainer();
    console.log("slide", lessonSlidesPosition.slide);
    console.log("container.length", container.length);

    if (
      lessonSlidesPosition.slide >= container.length &&
      lessonSlidesPosition.slide !== 0
    ) {
      console.log("zmien", (container.length - 1) * 100);
      return changePosition.changePosition(
        container.length - 1,
        -lessonSlidesPosition.position - (container.length - 1) * 100
      );
    }
  }, [
    changePosition,
    container,
    amountOfBoxesInContainer,
    lessonSlidesPosition,
  ]);

  useEffect(() => {
    window.addEventListener("resize", changeAmountOfDisplayedBoxes);

    return () => {
      window.removeEventListener("resize", changeAmountOfDisplayedBoxes);
    };
  }, [
    container,
    amountOfBoxesInContainer,
    changeAmountOfDisplayedBoxes,
    changePosition,
    lessonSlidesPosition,
  ]);

  useEffect(() => {
    amountOfBoxesInContainer();
  }, [amountOfBoxesInContainer]);

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
