import { useState } from 'react'

import SignUp from './componets/Signup'
import Signin from './componets/Signin'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AddExam from './componets/Addexam';
import ExamList from './componets/Dashboard';
import ExamDetails from './componets/Examdetails';
import SideNavbar from './componets/Navber';
function App() {
  const [isLoggedin,setIsLoggedin] = useState(true)
  const handleLogin = ()=>{
    setIsLoggedin(true)
  }
  const handleLogout = ()=>{
    localStorage.setItem('token',JSON.stringify(null))
    setIsLoggedin(false)
  }
  return (
    <>
    <Router>
     { isLoggedin && <SideNavbar onLogout={handleLogout}/>}
      <div style={{marginLeft: isLoggedin ? 240:0}}>
      <Routes>
      <Route path="/" element={<SignUp onLogin={handleLogin}/>}></Route>
      <Route path="/signin" element={<Signin onLogin={handleLogin}/>}></Route>
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
