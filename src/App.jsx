import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Mui_Login from './components/Mui_Login';
import Student from './components/Student.jsx';
// import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Mui_Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/student" element={<Student/>}/>
      </Routes>
    </Router>
  );
}

export default App;
