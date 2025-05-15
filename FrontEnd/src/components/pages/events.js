import React from 'react';
import { useNavigate } from 'react-router-dom';


function Events() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToChatting = () => {
    navigate('/Chatting');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  // Reservation 페이지로 이동
    };

    const goToLaundry_help = () => {
    navigate('/LaundryHelp');  // LaundryHelp 페이지로 이동
    };

    const goToEvents = () => {
        navigate('/Events');  // Reservation 페이지로 이동
    };

    const goToinformation = () => {
    navigate('/information');  // LaundryHelp 페이지로 이동
    };

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates');  // Reservation 페이지로 이동
    };

    const goToNews = () => {
    navigate('/News');  // LaundryHelp 페이지로 이동
    };

    const goToFacilities = () => {
        navigate('/Facilities');  // Reservation 페이지로 이동
    };

    const goToRoommateRegistration = () => {
    navigate('/RoommateRegistration');  // LaundryHelp 페이지로 이동
    };
    return (
        <div className="Events">
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
                                <li onClick={{goToLaundry_help}}>Help</li>
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

            {/* 본문 내용 */}
            <div style={{ 
                marginTop: '200px',  // 상단바 높이만큼 여백
                padding: '20px', 
                backgroundColor: '#444', 
                borderRadius: '8px', 
                maxWidth: '800px', 
                marginLeft: 'auto', 
                marginRight: 'auto',
                overflowY: 'auto', 
                maxHeight: 'calc(100vh - 70px)',  // 화면 높이에서 상단바 높이 제외
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
                    2025학년도 1학기 안암학사 화재대피훈련 실시 안내 (Anam Dormitory Fire Drill)
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '5px' }}>
                    2025-04-23 (수) | 조회: 2186
                </p>
                <hr style={{ margin: '10px 0', border: '1px solid #888' }} />

                <div style={{ lineHeight: '1.6', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                    <h3>2025학년도 1학기 안암학사 화재대피훈련 실시 안내</h3>
                    <p>(서울캠퍼스 기숙사 소방훈련)</p>
                    <p>훈련일시: 2025. 04. 30. (수) [불시훈련]</p>

                    <p>1. 관련근거: 「공공기관의 소방안전관리에 관한 규정」 제14조 (소방훈련과 교육)</p>
                    <p>2. 안암학사에서는 기숙사 화재 등 재난사고에 대한 학생들의 안전의식 및 대처능력을 재고하고 안전을 확보하고자 기숙사 화재대피훈련을 실시할 예정입니다.</p>
                    <p>기숙사 인명 대피, 비상 대피로 인지 등의 실제 인원 대피훈련을 실시하여, 훈련 중 학생들의 이동에 따른 대피로 점검 및 각종 문제점 등을 파악하여 안전을 확보할 예정입니다.</p>
                    <p>3. 실전 훈련 대비 화재 발생 시 행동요령 매뉴얼 및 건물별 대피로 안내문을 첨부하오니, 훈련에서의 적극적인 참여와 협조를 부탁드립니다.</p>
                    <p>4. 1학기 중간고사 일정 및 중간고사 보강주를 고려한 일정입니다.</p>

                    <hr style={{ margin: '20px 0', border: '1px solid #888' }} />

                    <h4>1. Announcement</h4>
                    <p>Anam Dormitory conducts fire drills every semester to increase safety awareness and practice emergency procedures.</p>
                    <p>This semester's fire drill will be held on April 30.</p>

                    <h4>2. Period</h4>
                    <p>- April 30, 2025 (Wed) / (Without Notice)</p>

                    <h4>3. Procedure for training</h4>
                    <p>- Follow the guidance of RA and manager to evacuate the building immediately.</p>
                    <p>- With the guidance of RA, line up and sign on the attendance list placed outside the building.</p>
                    <p>- Cautions: Non-cooperation in training for any reason will result in disadvantages.</p>

                    <p style={{ marginTop: '20px', textAlign: 'center' }}>
                        안암학사 행정팀
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Events;