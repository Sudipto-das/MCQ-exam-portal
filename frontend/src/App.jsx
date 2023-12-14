import { useState } from 'react'

import SignUp from './componets/Signup'
import Signin from './componets/Signin'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AddExam from './componets/Addexam';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/addExam" element={<AddExam/>}></Route>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
