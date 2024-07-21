import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Mui_Login from './components/Mui_Login';
// import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Mui_Login />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
