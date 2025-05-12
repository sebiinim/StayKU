import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Home, Dashboard } from './Home';
import Reservation from './pages/Laundry/Reservation';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Laundry/Reservation" element={<Reservation />} /> {/* 추가 */}
      </Routes>
    </Router>
  );
}

export default Routing;
