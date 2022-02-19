import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Workflow from "./components/workflow/Workflow";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import Learning from "./components/learning/Learning";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Workflow />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/games" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
