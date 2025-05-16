import React from 'react';
import LoginForm from './pages/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";  // 스타일 파일 연결
import Header from "./Header";

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
            <Header /> 

            {/* 콘텐츠 영역 */}
            <div className="content">
                <div className="section" id="board">
                    <h2>Roommate</h2>
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
                    <p>Information</p>
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
