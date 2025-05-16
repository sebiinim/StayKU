import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';
import Header from '../../Header';

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
        navigate('/facilities/anamglobalhouse/room');
    };

    
    const goToStudent = () => navigate('/facilities/student');
    const goToFrontier = () => navigate('/facilities/frontier');
    const goToCJHouse = () => navigate('/facilities/cjhouse');
    const goToAnamIHouse = () => navigate('/facilities/anamihouse');
    const goToAnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');


    return (
        <div className="FacilitiesRoom" style={{ marginTop: '50px' }}>
            {/* 상단 메뉴바 */}
            <Header />

            {/* 방 구성 및 가격 */}
            <div className="facilities-container">
                <h1 className="facilities-title">안암 글로벌 하우스 방 구성 및 가격</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button" onClick={goToAnamGlobalHouse}>기본정보</button>
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
                                <td>1인실</td>
                                <td>샤워실과 화장실은 공용이나, 2인용 각각 별도로 존재하여 출입이 편리한 룸타입</td>
                            </tr>
                            <tr>
                                <td>2인실</td>
                                <td>침대와 책상이 각각 나뉘어 있으며, 화장실과 샤워실은 2인 1실 단독 구비</td>
                            </tr>
                            <tr>
                                <td>3인실</td>
                                <td>2층 침대 1개, 1층 침대 1개로 구성되어 있으며, 화장실과 샤워실은 3인 1실마다 구비</td>
                            </tr>
                            <tr>
                                <td>장애인실</td>
                                <td>1층에 있으며, 샤워실과 화장실 포함 단독 1실로 구비</td>
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
                                <td>대학원</td>
                                <td>1인실</td>
                                <td>154</td>
                                <td>3,344,000 (학기) / 19,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>대학원</td>
                                <td>2인실</td>
                                <td>50</td>
                                <td>2,640,000 (학기) / 15,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>대학원</td>
                                <td>3인실</td>
                                <td>50</td>
                                <td>1,584,000 (학기) / 9,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>대학원</td>
                                <td>장애인실</td>
                                <td>2</td>
                                <td>1,900,000 (학기)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default FacilitiesRoom;