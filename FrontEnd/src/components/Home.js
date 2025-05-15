import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";  // 스타일 파일 연결
import MatchingRoommates from './pages/MatchingRoommates';
import Facilities from './pages/Facilities_Student';

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
                <p onClick={goToSignup} className="signup-text">
                    회원가입
                </p>
            </header>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToChatting = () => {
    navigate('/Chatting');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  
    };

    const goToLaundry_help = () => {
    navigate('/LaundryHelp'); 
    };

    const goToEvents = () => {
        navigate('/Events');  
    };

    const goToinformation = () => {
    navigate('/information');  
    };

    const goToFacilities = () => {
        navigate('/Facilities'); 
    };

    const goToNews = () => {
    navigate('/News'); 
    };

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates'); 
    };

    const goToRoommateRegistration = () => {
    navigate('/RoommateRegistration');
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
                                <li onClick={goToChatting}>Chatting</li>
                                <li onClick={goToMatchingRoommates}>Matching Roommates</li>
                                <li onClick={goToRoommateRegistration}>Roommate Registration</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Laundry
                            <ul className="submenu">
                                <li onClick={goToReservation}>Reservation</li>
                                <li onClick={goToLaundry_help}>Help</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            About Dormitory
                            <ul className="submenu">
                                <li onClick={goToNews}>News</li>
                                <li onClick={goToFacilities}>Facilities</li>
                                <li onClick={goToEvents}>Event</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Help
                            <ul className="submenu">
                                <li onClick={goToinformation}>Information</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* 콘텐츠 영역 */}
            <div className="content">
                <div className="section" id="board">
                    <h2>Board</h2>
                    <p>Chatting</p>
                    <p>Matching Roommates</p>
                    <p>Roommate Registration</p>
                </div>
                <div className="section" id="laundry">
                    <h2>Laundry</h2>
                    <p>Reservation</p>
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
                    <p>Information</p>
                </div>
            </div>
        </div>
    );
}

export { Home, Dashboard };
