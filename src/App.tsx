import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Workflow from "./components/workflow/Workflow";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Workflow />} />
          {/* <Route path="/" element={<Workflow />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
