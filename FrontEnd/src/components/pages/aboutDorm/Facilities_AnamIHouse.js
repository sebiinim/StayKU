import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';
import Header from '../../Header';

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

    const goToRoomPage = () => navigate('/facilities/anamihouse/room');
    const goToFacilities_Student = () => navigate('/facilities/student');
    const goToFacilities_Frontier = () => navigate('/facilities/frontier');
    const goToFacilities_CJHouse = () => navigate('/facilities/cjhouse');
    const goToFacilities_AnamIHouse = () => navigate('/facilities/anamihouse');
    const goToFacilities_AnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');

    return (
        <div className="Facilities">
            {/* 상단 메뉴바 */}
            <Header />

            {/* 주요 시설 안내 */}
            <div className="facilities-container">
                <h1 className="facilities-title">안암 인터내셔널 하우스 주요 시설 안내</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button active" onClick={goToFacilities_AnamIHouse}>기본정보</button>
                    <button className="tab-button" onClick={goToRoomPage}>방 구성 및 가격</button>
                </div>
                
                {/* 건축개요 */}
                <div className="table-section">
                    <h2>건축개요</h2>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td>대지위치</td>
                                <td>서울특별시 성북구 안암로 145</td>
                                <td>건축(연)면적</td>
                                <td>1,975㎡</td>
                            </tr>
                            <tr>
                                <td>구조</td>
                                <td>철근콘크리트</td>
                                <td>층수</td>
                                <td>지하1층, 지상 5층</td>
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
                                <th>남학생동 (2층)</th>
                                <th>여학생동 (1,3~4층)</th>
                                <th>교원동</th>
                            </tr>
                            <tr>
                                <td>
                                    입주 가능 인원: 170명<br />
                                    호실 수: 2인실 - 82실<br />
                                    1인실 - 5실<br />
                                    장애인실 - 1실
                                </td>
                                <td>
                                    입주 가능 인원: 182명<br />
                                    호실 수: 2인실 - 90실<br />
                                    장애인실 - 2실
                                </td>
                                <td>
                                    입주 가능 인원: 49명<br />
                                    호실 수: 3인실 - 10실<br />
                                    2인실 - 1실<br />
                                    1인실 - 17실
                                </td>
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
                                <td>5층</td>
                                <td>세미나실, 세탁실, 가족실 501~526</td>
                            </tr>
                            <tr>
                                <td>4층</td>
                                <td>세미나실, 휴게실, 여자호실 401~445</td>
                            </tr>
                            <tr>
                                <td>3층</td>
                                <td>세미나실, 휴게실, 여자호실 301~345/ 가족실 346~347</td>
                            </tr>
                            <tr>
                                <td>2층</td>
                                <td>세미나실, 휴게실, 남자호실 201~252</td>
                            </tr>
                            <tr>
                                <td>1층</td>
                                <td>경비안내실, 다목적실, 간이식당, 유연물보관소, 샤워실, 경비원휴게실, 남자호실 101~136</td>
                            </tr>
                            <tr>
                                <td>지하 1층</td>
                                <td>주차장, 세탁실</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Facilities;
