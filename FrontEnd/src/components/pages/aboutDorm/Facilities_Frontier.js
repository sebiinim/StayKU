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

    const goToRoomPage = () => navigate('/facilities/frontier/room');
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
                <h1 className="facilities-title">프런티어관 기숙사 주요 시설 안내</h1>

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
                                <td>서울특별시 성북구 안암로 145</td>
                                <td>건축(연)면적</td>
                                <td>16,193.66㎡</td>
                            </tr>
                            <tr>
                                <td>구조</td>
                                <td>철근콘크리트</td>
                                <td>층수</td>
                                <td>지하 2층, 지상 7층</td>
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
                            </tr>
                            <tr>
                                <td>입주 가능 인원: 414명<br />호실 수: 209실</td>
                                <td>입주 가능 인원: 529명<br />호실 수: 266실</td>
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
                                <td>7층</td>
                                <td>남자호실 M701-728, 여자호실 W701-743</td>
                            </tr>
                            <tr>
                                <td>6층</td>
                                <td>남자호실 M601-633, 여자호실 W601-630</td>
                            </tr>
                            <tr>
                                <td>5층</td>
                                <td>남자호실 M501-532, 여자호실 W501-543</td>
                            </tr>
                            <tr>
                                <td>4층</td>
                                <td>남자호실 M401-433, 여자호실 W401-443</td>
                            </tr>
                            <tr>
                                <td>3층</td>
                                <td>남자호실 M301-333, 여자호실 W301-343</td>
                            </tr>
                            <tr>
                                <td>2층</td>
                                <td>남자호실 M201-227, 여자호실 W201-225</td>
                            </tr>
                            <tr>
                                <td>1층</td>
                                <td>경비안내실, 생활상담실, 남자호실 M101-115, 여자호실 W101-116</td>
                            </tr>
                            <tr>
                                <td>지하 1층</td>
                                <td>강당, 임대공간, 정독실, 세탁실, 남자호실 BM101-111, 여자호실 BW101-110</td>
                            </tr>
                            <tr>
                                <td>지하 2층</td>
                                <td>기계실, 전기실, 경비휴게실, 세탁실</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Facilities;
