import React from 'react';
import { useNavigate } from 'react-router-dom';


function Events() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToChatting = () => {
    navigate('/Chatting');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  // Reservation 페이지로 이동
    };

    const goToLaundry_help = () => {
    navigate('/LaundryHelp');  // LaundryHelp 페이지로 이동
    };

    const goToEvents = () => {
        navigate('/Events');  // Reservation 페이지로 이동
    };

    const goToinformation = () => {
    navigate('/information');  // LaundryHelp 페이지로 이동
    };

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates');  // Reservation 페이지로 이동
    };

    const goToNews = () => {
    navigate('/News');  // LaundryHelp 페이지로 이동
    };

    const goToFacilities = () => {
        navigate('/Facilities');  // Reservation 페이지로 이동
    };

    const goToRoommateRegistration = () => {
    navigate('/RoommateRegistration');  // LaundryHelp 페이지로 이동
    };
    return (
        <div className="Events">
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
                                <li onClick={{goToLaundry_help}}>Help</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            About Dormitory
                            <ul className="submenu">
                                <li onClick={goToNews}>News</li>
                                <li onClick={goToFacilities}>Facilities</li>
                                <li onClick={goToEvents}>Events</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Help
                            <ul className="submenu">
                                <li onClick={goToinformation}>information</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
          </div>

    )
}
export default Events;