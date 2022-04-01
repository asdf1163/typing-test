import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  IdataCategory,
  IlessonSlidePosition,
  Ilesson,
} from "./learning.interfaces";
import "./learning.css";
import { lessons } from "./mockUpData";
import LearningBox from "./learningBox/LearningBox";

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

  const [amountOfBoxesDefault, setAmountOfBoxesDefault] = useState(0);
  const [container, setContainer] = useState<Ilesson[][]>([]);
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

  const changePosition = useMemo(() => {
    return {
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
  }, [lessonSlidesPosition]);

  const slideButtonValidation = {
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

  const amountOfBoxesInContainer = useCallback(() => {
    const windowWidth = window.innerWidth;
    let boxWidth = 300; //px
    let marginInBoxCSS = windowWidth * 0.03;

    const amountOfBoxes = Math.floor(windowWidth / (boxWidth + marginInBoxCSS));
    if (amountOfBoxes !== amountOfBoxesDefault) {
      setAmountOfBoxesDefault(amountOfBoxes);
      const arrayOfLessons: Ilesson[][] = [];
      const lengthOfLessons = lessons.length;
      for (
        let minValue = 0, maxValue = amountOfBoxes;
        minValue <= lengthOfLessons;
        minValue = maxValue, maxValue += amountOfBoxes
      ) {
        const newContainer: Ilesson[] = lessons.slice(minValue, maxValue);
        if (newContainer.length > 0) {
          arrayOfLessons.push(newContainer);
        }
      }
      setContainer(arrayOfLessons);
      return true;
    }
  }, [amountOfBoxesDefault]);

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
        (container.length - 2) * 100
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
        {slideButtonValidation.previousSlide() && (
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
                {slide.map((lesson: Ilesson) => {
                  return (
                    <LearningBox lesson={lesson} key={`box${lesson.id}`} />
                  );
                })}
              </div>
            );
          })}
        </div>
        {slideButtonValidation.nextSlide() && (
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
