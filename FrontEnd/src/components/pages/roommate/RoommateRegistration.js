import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';


function RoommateRegistration() {
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
        <div className="RoommateRegistration">
            {/* 상단 메뉴바 */}
            <Header />
          </div>

    )
}
export default RoommateRegistration;