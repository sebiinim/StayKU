import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const goToSignup = () => {
        navigate('/signup');
    };
  return (
    <div className="Home">
      <header className="App-header">
        <h1>StayKU</h1>
        <LoginForm />
        <p
          onClick={goToSignup}
          className="signup-text">
          회원가입
          </p>
      </header>
    </div>
  );
}


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>You have successfully logged in!</p>
    </div>
  );
}



export { Home, Dashboard };
