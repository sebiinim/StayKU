import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* 로그인 여부에 따라 홈화면 또는 로그인 화면으로 이동 */}
        <Route path="/" element={isLoggedIn ? <BeforeLogin /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
