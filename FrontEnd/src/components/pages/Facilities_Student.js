import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';

function Facilities() {
    const navigate = useNavigate();

    const styles = {
        container: {
            marginTop: '120px',
            backgroundColor: '#282c34',
            color: 'white',
            minHeight: '100vh',
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            fontSize: '28px',
            marginBottom: '20px',
        },
        tableSection: {
            margin: '30px auto',
            maxWidth: '800px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
            backgroundColor: '#e0e0e0',
            fontWeight: 'bold',
            color: '#333',
        },
        td: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
            backgroundColor: '#f5f5f5',
            color: '#333',
        },
    };

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

    const goToFacilities_Student = () => navigate('/facilities/student');
    const goToFacilities_Frontier = () => navigate('/facilities/frontier');
    const goToFacilities_CJHouse = () => navigate('/facilities/cjhouse');
    const goToFacilities_AnamIHouse = () => navigate('/facilities/anamihouse');
    const goToFacilities_AnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');


    const goToRoomPage = () => {
        navigate('/facilities/room');
    };

    return (
        <div className="Facilities">
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

            {/* 주요 시설 안내 */}
            <div className="facilities-container">
                <h1 className="facilities-title">학생동 기숙사 주요 시설 안내</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button active" onClick={goToFacilities_Student}>기본정보</button>
                    <button className="tab-button" onClick={goToRoomPage}>방 구성 및 가격</button>
                </div>

                {/* 건축개요 표 */}
                <div className="table-section">
                    <h2>건축개요</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td>대지위치</td>
                                <td>서울특별시 성북구 안암로 145, 고려대학교 안암학사</td>
                            </tr>
                            <tr>
                                <td>건축(연)면적</td>
                                <td>1,947㎡</td>
                            </tr>
                            <tr>
                                <td>구조</td>
                                <td>철근콘크리트조</td>
                            </tr>
                            <tr>
                                <td>층수</td>
                                <td>지하 1층, 지상 5층</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 입주 인원 및 호실 개수 */}
                <div className="table-section">
                    <h2>입주 인원 및 호실 개수</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>입주 가능 인원</th>
                                <th>호실 수</th>
                            </tr>
                            <tr>
                                <td>578명 (남학생 188명, 장애인실 7개)</td>
                                <td>251명 (여학생 87명, 장애인실 4개)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 층별 안내 */}
                <div className="table-section">
                    <h2>층별 안내</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>층 구분</th>
                                <th>용 구분</th>
                                <th>시설안내</th>
                            </tr>
                            <tr>
                                <td>5층</td>
                                <td>휴게실</td>
                                <td>501호~526호</td>
                            </tr>
                            <tr>
                                <td>4층</td>
                                <td>세탁실</td>
                                <td>401호~426호</td>
                            </tr>
                            <tr>
                                <td>3층</td>
                                <td>독서실</td>
                                <td>301호~326호</td>
                            </tr>
                            <tr>
                                <td>2층</td>
                                <td>운동실</td>
                                <td>201호~226호</td>
                            </tr>
                            <tr>
                                <td>1층</td>
                                <td>식당</td>
                                <td>101호~126호</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Facilities;
