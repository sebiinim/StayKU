import React from 'react';
import { useNavigate } from 'react-router-dom';


function Information() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToCommunity = () => {
    navigate('/Community');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  
    };

    const goToLaundry_help = () => {
    navigate('/laundry_help'); 
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

    const goToCategories = () => {
    navigate('/Categories');
    };
    return (
        <div className="Information">
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
                                <li onClick={goToCommunity}>Community</li>
                                <li onClick={goToMatchingRoommates}>Matching Roommates</li>
                                <li onClick={goToCategories}>Categories</li>
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
export default Information;