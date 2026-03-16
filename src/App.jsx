import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { MainScreen } from './components/MainScreen'
import { QuizScreen } from './components/QuizScreen'


function App() {

  return (
    <>
      <Routes>
         <Route path="/" element={<MainScreen />} />
         <Route path="/quiz" element={<QuizScreen />} />
      </Routes>
    </>
  )
}

export default App
