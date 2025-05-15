import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';

function FacilitiesRoom() {
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

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates');
    };

    const goToNews = () => {
        navigate('/News');
    };

    const goToFacilities = () => {
        navigate('/Facilities');
    };

    const goToRoommateRegistration = () => {
        navigate('/RoommateRegistration');
    };

    const goToBasicInfo = () => {
        navigate('/facilities');
    };

    const goToRoomPage = () => {
        navigate('/facilities/frontier/room');
    };

    
    const goToStudent = () => navigate('/facilities/student');
    const goToFrontier = () => navigate('/facilities/frontier');
    const goToCJHouse = () => navigate('/facilities/cjhouse');
    const goToAnamIHouse = () => navigate('/facilities/anamihouse');
    const goToAnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');


    return (
        <div className="FacilitiesRoom" style={{ marginTop: '50px' }}>
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
                                <li onClick={goToEvents}>Events</li>
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

            {/* 방 구성 및 가격 */}
            <div className="facilities-container">
                <h1 className="facilities-title">프런티어관 기숙사 방 구성 및 가격</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button" onClick={goToFrontier}>기본정보</button>
                    <button className="tab-button active" onClick={goToRoomPage}>방 구성 및 가격</button>
                </div>

                {/* 방 유형 표 */}
                <div className="table-section">
                    <h2>기숙사 방 유형</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>방 유형</th>
                                <th>설명</th>
                            </tr>
                            <tr>
                                <td>2인실</td>
                                <td>일체형 침대(책상, 책장, 서랍장 포함)와 옷장, 의자가 비치되어 있으며, 개인 화장실을 이용 가능</td>
                            </tr>
                            <tr>
                                <td>장애인실</td>
                                <td>싱글침대와 책상이 비치되어 있으며, 개인 화장실을 이용 가능.침대, 책상, 장애학생 지원 시설 포함</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 기숙사 비용 표 */}
                <div className="table-section">
                    <h2>기숙사 비용</h2>
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>방 유형</th>
                                <th>호실 수</th>
                                <th>기숙사비 (원)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>학부</td>
                                <td>2인실</td>
                                <td>468</td>
                                <td>1,652,000 (학기) / 14,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>학부</td>
                                <td>장애인실</td>
                                <td>7</td>
                                <td>2,041,400 (학기) / 17,300 (1박)
</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FacilitiesRoom;
