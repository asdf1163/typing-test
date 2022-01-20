import React from 'react';
import './App.css';
import Header from './components/Header';
import Workflow from './components/workflow/Workflow';

function App() {
  return (
    <div className="App">
      <Header/>
      <Workflow/>
    </div>
  );
}

export default App;
