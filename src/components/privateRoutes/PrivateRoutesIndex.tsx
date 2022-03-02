import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import Learning from "./learning/Learning";
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
        <Route path="/learn" element={<Learning />} />
        <Route path="/games" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default PrivateRoutesIndex;
