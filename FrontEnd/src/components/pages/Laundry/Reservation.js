import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';

function Reservation() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [reservations, setReservations] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentMachine, setCurrentMachine] = useState(null);

    const navigate = useNavigate();

    const handleReservation = () => {
        if (!selectedDate || !selectedTime) {
            alert('날짜와 시간을 모두 입력하세요.');
            return;
        }
        const newReservation = {
            machine: `${currentMachine}`,
            date: selectedDate,
            time: selectedTime,
        };
        setReservations([...reservations, newReservation]);
        alert('예약이 완료되었습니다.');
        setIsPopupOpen(false);  // 팝업 닫기
    };

    const openPopup = (machineType, machineNumber) => {
        const machineLabel = `${machineType} ${machineNumber}`;
        setCurrentMachine(machineLabel);
        setSelectedMachine(machineLabel);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToCommunity = () => {
    navigate('/Community');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  
    };

    const goToLaundry_help = () => {
    navigate('/laundry_help'); 
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

    const goToCategories = () => {
    navigate('/Categories');
    };

    return (
        <div className="reservation-container">
            {/* 상단 헤더 */}
            <header className="top_left">
                <div className="logo" onClick={goToDashboard} style={{ cursor: "pointer" }}>
                    StayKU
                </div>
                <nav className="navbar">
                    <ul className="menu">
                        <li className="menu-item">
                            Board
                            <ul className="submenu">
                                <li onClick={goToCommunity}>Community</li>
                                <li onClick={goToMatchingRoommates}>Matching Roommates</li>
                                <li onClick={goToCategories}>Categories</li>
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
                                <li onClick={goToEvents}>Event</li>
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

            {/* 예약 상태 확인 - 세탁기*/}
            <div className="status-section">
                <h2>Select Washers</h2>
                <div className="machine-status">
                    {[...Array(8)].map((_, index) => (
                        <div 
                            key={`W${index + 1}`} 
                            className={`machine ${index === 1 ? 'in-use' : 'available'}`} 
                            onClick={() => openPopup('Washer', index + 1)}
                            style={{ cursor: "pointer" }}
                        >
                            W{index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* 예약 상태 확인 - 건조기 */}
            <div className="status-section">
                <h2>Select Dryers</h2>
                <div className="machine-status">
                    {[...Array(8)].map((_, index) => (
                        <div 
                            key={`D${index + 1}`} 
                            className={`machine ${index === 3 ? 'in-use' : 'available'}`} 
                            onClick={() => openPopup('Dryer', index + 1)}
                            style={{ cursor: "pointer", position: "relative" }}  // 위치 지정
                        >
                            D{index + 1}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 상태 표시 영역 */}
            <div className="status-indicator-group">
                <div className="small-box available-box"></div>
                <span>: Available</span>
                <div className="small-box unavailable-box"></div>
                <span>: Unavailable</span>
            </div>


            {/* 예약 입력 팝업 */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>{currentMachine} Reservation</h3>
                        <label>Select Date:</label>
                        <input 
                            type="date" 
                            value={selectedDate} 
                            onChange={(e) => setSelectedDate(e.target.value)} 
                            className="form-input"
                        />

                        <label>Select Time:</label>
                        <input 
                            type="time" 
                            value={selectedTime} 
                            onChange={(e) => setSelectedTime(e.target.value)} 
                            className="form-input"
                        />

                        {/* 버튼 그룹 */}
                        <div className="button-group">
                            <button onClick={handleReservation} className="submit-button">Reserve</button>
                            <button onClick={closePopup} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 예약 목록 */}
            <div className="reservation-list">
                <h3>My Reservations</h3>
                <ul>
                    {reservations.map((res, index) => (
                        <li key={index}>
                            {res.machine} - {res.date} {res.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Reservation;
