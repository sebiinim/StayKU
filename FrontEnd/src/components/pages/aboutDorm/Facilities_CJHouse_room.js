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
        navigate('/facilities/cjHouse/room');
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
                <h1 className="facilities-title">CJ 인터내셔널 하우스 방 구성 및 가격</h1>

                {/* 이전 버튼 */}
                <button className="back-button" onClick={goToFacilities}>이전</button>

                {/* 탭 메뉴 */}
                <div className="tab-menu">
                    <button className="tab-button" onClick={goToCJHouse}>기본정보</button>
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
                                <td>2 Bed Family2 (1인실)</td>
                                <td>대학원생3P(1인실)</td>
                            </tr>
                            <tr>
                                <td>2 Bed Family2 (2인실)</td>
                                <td>대학원생 3P(2인실)</td>
                            </tr>
                            <tr>
                                <td>1인실</td>
                                <td>룸 하나 당 싱글 침대와 책상이 하나씩 배치되어 있으며, 화장실은 룸타입마다 공유인원이 다릅니다.(A타입: 3인 1실, B타입: 5인 1실, C타입: 2인 1실)</td>
                            </tr>
                            <tr>
                                <td>2인실</td>
                                <td>2개의 싱글 침대와 책상이 한 방에 배치되어 있으며 화장실은 룸타입마다 공유인원이 다릅니다.(A타입: 3인 1실, B타입: 5인 1실, C타입: 2인 1실)</td>
                            </tr>
                            <tr>
                                <td>장애인실</td>
                                <td>룸 하나 당 싱글 침대와 책상이 하나씩 배치되어 있으며 1인 화장실이 있습니다.</td>
                            </tr>
                            <tr>
                                <td>Studio</td>
                                <td>1인실 36실이 있습니다.</td>
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
                                <td>대학원생</td>
                                <td>2 Bed Family2 (1인실)</td>
                                <td>5</td>
                                <td>2,520,000 (학기) / 20,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>대학원생</td>
                                <td>2 Bed Family2 (2인실)</td>
                                <td>5</td>
                                <td>2,041,400 (학기) / 17,300 (1박)</td>
                            </tr>
                            <tr>
                                <td>학부생</td>
                                <td>1인실</td>
                                <td>114</td>
                                <td>2,451,000 (학기) / 19,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>학부생</td>
                                <td>2인실</td>
                                <td>56</td>
                                <td>1,935,000 (학기) / 15,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>학부생</td>
                                <td>장애인실</td>
                                <td>4</td>
                                <td>2,451,000 (학기) / 19,000 (1박)</td>
                            </tr>
                            <tr>
                                <td>대학원생</td>
                                <td>Studio</td>
                                <td>-</td>
                                <td>720,000 (월) / 24,000 (1박)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FacilitiesRoom;
