import { useState } from 'react'

import SignUp from './componets/Signup'
import Signin from './componets/Signin'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AddExam from './componets/Addexam';
import ExamList from './componets/Dashboard';
import ExamDetails from './componets/Examdetails';
import SideNavbar from './componets/Navber';
function App() {
  

  return (
    <>
    <Router>
      <SideNavbar/>
      <div style={{marginLeft:240}}>
      <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/addExam" element={<AddExam/>}></Route>
      <Route path="/dashboard" element={<ExamList/>}></Route>
      <Route path='/exam-details/:examId' element={<ExamDetails/>}></Route>
      </Routes>
      </div>
    </Router>
    
    </>
  )
}

export default App
