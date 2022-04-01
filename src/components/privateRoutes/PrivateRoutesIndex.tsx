import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import Learning from "./learning/Learning";
import LessonCategories from "./learning/lessonCategories/LessonCategories";
import LessonOptions from "./learning/lessonOptions/LessonOptions";
import Main from "./main/Main";
import Navbar from "./navbar/Navbar";
import Workflow from "./workflow/Workflow";

const PrivateRoutesIndex = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Workflow />} />
        <Route path="lesson" element={<Learning />} />
        <Route path="/lesson/:lessonId" element={<LessonCategories />} />
        <Route
          path="/lesson/:lessonId/lecture"
          element={<LessonOptions type={"Lecture"} />}
        />
        <Route
          path="/lesson/:lessonId/practice"
          element={<LessonOptions type={"Practice"} />}
        />
        <Route path="/lesson/:lessonId/test" element={<NotFound />} />
        <Route path="/game" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default PrivateRoutesIndex;
