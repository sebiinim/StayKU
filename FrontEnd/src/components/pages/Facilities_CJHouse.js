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

    const goToRoomPage = () => navigate('/facilities/cjhouse/room');
    const goToFacilities_Student = () => navigate('/facilities/student');
    const goToFacilities_Frontier = () => navigate('/facilities/frontier');
    const goToFacilities_CJHouse = () => navigate('/facilities/cjhouse');
    const goToFacilities_AnamIHouse = () => navigate('/facilities/anamihouse');
    const goToFacilities_AnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');

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
                <h1 className="facilities-title">CJ 인터내셔널 하우스 주요 시설 안내</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button active" onClick={goToFacilities_CJHouse}>기본정보</button>
                    <button className="tab-button" onClick={goToRoomPage}>방 구성 및 가격</button>
                </div>
                
                {/* 건축개요 표 */}
                <div className="table-section">
                    <h2>건축개요</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td>대지위치</td>
                                <td>서울특별시 성북구 안암로 145</td>
                                <td>건축(연)면적</td>
                                <td>6883㎡</td>
                            </tr>
                            <tr>
                                <td>구조</td>
                                <td>철근콘크리트</td>
                                <td>층수</td>
                                <td>지하 1층, 지상 6층</td>
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
                                <th>남학생동</th>
                                <th>여학생동</th>
                                <th>교원동</th>
                            </tr>
                            <tr>
                                <td>입주 가능 인원: 58<br />호실 수: 13실(2인실), 31실(1인실), 1실(장애인실)</td>
                                <td>입주 가능 인원: 529명<br />호실 수: 43실(2인실), 83실(1인실), 3실(장애인실)</td>
                                <td>입주 가능 인원: 00명<br />호실 수: 6실(2인실), 0실(1인실)</td>
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
                                <th>시설안내</th>
                            </tr>
                            <tr>
                                <td>6층</td>
                                <td>관장실, 스터디룸, 라운지, 학생호실 601~606, 622~635</td>
                            </tr>
                            <tr>
                                <td>5층</td>
                                <td>스터디룸, 교원동 501~506, 학생호실 521~535</td>
                            </tr>
                            <tr>
                                <td>4층</td>
                                <td>스터디룸, 교원동 401~412, 학생호실 421~435</td>
                            </tr>
                            <tr>
                                <td>3층</td>
                                <td>스터디룸, 교원동 301~312, 학생호실 321~335</td>
                            </tr>
                            <tr>
                                <td>2층</td>
                                <td>피트니스룸, 교원동 201~212, 학생호실 221~222</td>
                            </tr>
                            <tr>
                                <td>1층</td>
                                <td>경비안내실, 경비원휴게실, 카페테리아, 교원동 101~105</td>
                            </tr>
                            <tr>
                                <td>지하 1층</td>
                                <td>기관실, YBM라운지, 컨퍼런스홀, 세미나실, 음악실, 기도실, 세탁실</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Facilities;
