import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";  // 스타일 파일 연결



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
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="Dashboard">
      {/* 상단 메뉴바 */}
      <header className="top_left">
        <div className="logo" onClick={goToDashboard} style={{ cursor: "pointer" }}>
          StayKU
        </div>
        <nav className="navbar">
          <ul className="menu">
            <li className="menu-item">
              Board
              <ul className="submenu">
                <li>Community</li>
                <li>Matching Roommates</li>
                <li>Categories</li>
              </ul>
            </li>
            <li className="menu-item">
              Laundry
              <ul className="submenu">
                <li>Reservation</li>
                <li>Current Situation</li>
                <li>Help</li>
              </ul>
            </li>
            <li className="menu-item">
              About Dormitory
              <ul className="submenu">
                <li>News</li>
                <li>Facilities</li>
                <li>Event</li>
              </ul>
            </li>
            <li className="menu-item">
              Help
              <ul className="submenu">
                <li>Email</li>
                <li>Phone</li>
                <li>Location</li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/* 콘텐츠 영역 */}
      <div className="content">
        <div className="section" id="board">
          <h2>Board</h2>
          <p>Community</p>
          <p>Matching Roommates</p>
          <p>Categories</p>
        </div>
        <div className="section" id="laundry">
          <h2>Laundry</h2>
          <p>Reservation</p>
          <p>Current Situation</p>
          <p>Help</p>
        </div>
        <div className="section" id="about-dormitory">
          <h2>About Dormitory</h2>
          <p>News</p>
          <p>Facilities</p>
          <p>Event</p>
        </div>
        <div className="section" id="help">
          <h2>Help</h2>
          <p>Email</p>
          <p>Phone</p>
          <p>Location</p>
        </div>
      </div>
    </div>
  );
}



export { Home, Dashboard };
