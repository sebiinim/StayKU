import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LaundryHelp.css";


function LaundryHelp() {
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
        <div className="LaundryHelp">
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

            <div class="landry_help-container">
              <div class="landry_help-info-box">
                <h2>세탁기와 건조기 예약 시스템 이용 안내</h2>
        
                  <p><strong>시스템 개요</strong></p>
                  <p> 본 예약 시스템은 기숙사 내 세탁기와 건조기 사용을 효율적으로 관리하기 위해 제작되었습니다. 세탁기와 건조기의 현재 상태를 한눈에 확인하고, 
                      예약 가능한 장비를 선택하여 사용일자와 시간을 예약할 수 있습니다.</p>
        
                  <p><strong>접속 및 화면 확인</strong></p>
                  <p>페이지에 접속하면 화면 중앙에 세탁기와 건조기 목록이 표시됩니다. 상단에는 Select Washers (세탁기 선택), 중간에는 Select Dryers (건조기 선택), 하단에는 My Reservations (나의 예약)이 보여집니다. </p>

                  <p><strong>장비 상태 확인</strong></p>
                  <p>장비 버튼의 색상을 통해 현재 상태를 확인할 수 있습니다.</p>
                  <ul>
                  <li class="landry_help-status-green">초록색: 예약 가능 상태 (Available)</li>
                  <li class="landry_help-status-gray">   회색: 현재 사용 중 상태, 시간 예약 가능 (Unavailable)</li>
                  </ul>
        
                  <p>각 버튼 하단에 있는 색상 설명을 통해 상태를 한눈에 파악할 수 있습니다.</p>

                  <p><strong>상태 갱신</strong></p>
                  <p>장비 상태는 실시간으로 갱신되며, 사용자가 예약을 완료하거나 취소할 때 즉시 반영됩니다. 페이지를 새로고침하지 않아도 자동으로 최신 상태를 보여줍니다.</p>

                  <p class="landry_help-alert">🚨주의사항</p>
                  <p>예약하지 않고 장비를 사용하는 경우, 기숙사 규정에 따라 제재를 받을 수 있습니다. 예약 후 지정 시간 내에 사용하지 않으면 자동으로 예약이 취소될 수 있습니다. 사용 종료 후 다음 사용자에게 불편이 없도록 세탁기/건조기 내부를 깨끗하게 관리해 주세요.</p>

                  <p class="landry_help-support">💬고객 지원</p>
                  <p>사용 중 문제가 발생하거나 예약 오류가 있는 경우, 관리자에게 문의하시기 바랍니다. 시스템 오류 또는 문의 사항은 기숙사 관리실로 연락 바랍니다.</p>
                </div>
            </div>

        </div>


    )
}
export default LaundryHelp;