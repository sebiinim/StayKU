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
            <div style={{ color: 'white', padding: '30px', fontSize: '20px', marginTop: '100px' }}>
                <p>룸메이트 등록 페이지, 프론트는 구현 예정입니다.</p>
            </div>
        </div>
    )
}
export default RoommateRegistration;