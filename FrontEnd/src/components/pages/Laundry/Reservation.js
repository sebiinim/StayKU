import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMachineStatus, reserveMachine } from '../../../api/reservation';
import './Reservation.css';

function Reservation() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [reservations, setReservations] = useState([]);
    const [machineStatus, setMachineStatus] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentMachine, setCurrentMachine] = useState(null);
    const [machineType, setMachineType] = useState('');
    const [userId, setUserId] = useState('');  // 사용자 ID
    const navigate = useNavigate();

    // 로그인한 사용자 ID 가져오기 (예시)
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');  // 로그인 페이지로 이동
        }
    }, [navigate]);

// 예약 팝업 열기 함수 수정
const openPopup = (machineType, machineNumber) => {
    // Machine ID가 올바른지 확인
    if (isNaN(machineNumber) || machineNumber <= 0) {
        console.error("잘못된 기기 번호입니다:", machineNumber);
        alert("기기 번호가 올바르지 않습니다.");
        return;
    }

    const machineLabel = `${machineType} ${machineNumber}`;
    console.log(1)
    console.log(machineStatus[machineLabel])
    console.log(1)
    if (machineStatus[machineLabel] === 'available') {
        alert('즉시 사용 가능한 기기입니다.');
        return;
    }

    setCurrentMachine(machineLabel);
    setSelectedMachine(machineLabel);
    setMachineType(machineType.toLowerCase());
    setIsPopupOpen(true);
};


    const closePopup = () => setIsPopupOpen(false);

    const navigateTo = (path) => navigate(path);
    const goToChatting = () => navigateTo('/Chatting');
    const goToLaundry_help = () => navigateTo('/LaundryHelp');
    const goToEvents = () => navigateTo('/Events');
    const goToinformation = () => navigateTo('/information');
    const goToFacilities = () => navigateTo('/Facilities');
    const goToNews = () => navigateTo('/News');
    const goToMatchingRoommates = () => navigateTo('/MatchingRoommates');
    const goToRoommateRegistration = () => navigateTo('/RoommateRegistration');
    const goToDashBoard = () => navigateTo('/dashboard');
    const goToReservation = () => navigateTo('/laundry/reservation');

// 예약 상태 불러오기
useEffect(() => {
    const loadStatus = async () => {
        try {
            const data = await fetchMachineStatus();
            const statusMap = {};

            data.forEach(item => {
                const type = item.type === 'washer' ? 'Washer' : 'Dryer';
                const machineLabel = `${type} ${item.id}`;
                statusMap[machineLabel] = item.status;
            });

            console.log("불러온 상태:", statusMap);  // 디버깅용
            setMachineStatus(statusMap);
        } catch (error) {
            console.error("기기 상태 불러오기 오류:", error);
            alert('기기 상태를 불러오는 데 실패했습니다.');
        }
    };
    loadStatus();

    // 상태를 주기적으로 업데이트하여 최신 상태 유지
    const interval = setInterval(() => {
        loadStatus();
    }, 5000); // 5초마다 갱신

    return () => clearInterval(interval);
}, []);



const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
        alert('날짜와 시간을 모두 입력하세요.');
        return;
    }

    try {
        // machineId가 올바르게 파싱되는지 확인
        const machineNumber = parseInt(currentMachine.split(' ')[1]);
        if (isNaN(machineNumber)) {
            alert('기기 번호가 올바르지 않습니다.');
            console.error("잘못된 Machine ID:", currentMachine);
            return;
        }

        // 예약 직전에 최신 상태 불러오기
        const latestStatus = await fetchMachineStatus();
        const machineLabel = `${machineType} ${machineNumber}`;
        console.log("예약 전 최신 상태 확인:", latestStatus);

        // 최신 상태 확인 후 예약 가능 여부 판단
        if (latestStatus[machineLabel] === 'available') {
            await reserveMachine(machineType, machineNumber, userId);
            alert('예약이 완료되었습니다.');

            // 예약 후 상태를 다시 불러옴
            const updatedStatus = await fetchMachineStatus();
            console.log("예약 후 상태 확인:", updatedStatus);
            setMachineStatus(updatedStatus);

            setReservations([...reservations, { machine: currentMachine, date: selectedDate, time: selectedTime }]);
            setIsPopupOpen(false);
        } else {
            alert('즉시 사용 가능한 기기입니다.');
        }
    } catch (error) {
        alert(error.message || '예약에 실패했습니다.');
        console.error("예약 오류:", error);
    }
};




    return (
        <div className="reservation-container">
            {/* 상단 헤더 */}
            <header className="top_left">
                <div className="logo" onClick={goToDashBoard} style={{ cursor: "pointer" }}>
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
                    {[...Array(8)].map((_, index) => {
                        const machineLabel = `Washer ${index + 1}`;
                        const isUnavailable = machineStatus[machineLabel] === 'in_use';
                        return (
                            <div 
                                key={machineLabel}
                                className={`machine ${isUnavailable ? 'unavailable' : 'available'}`}
                                onClick={() => openPopup('Washer', index + 1)}
                                style={{ cursor: isUnavailable ? 'not-allowed' : 'pointer' }}
                            >
                                W{index + 1}
                            </div>  
                        );
                    })}
                </div>
            </div>

            {/* 예약 상태 확인 - 건조기 */}
            <div className="status-section">
                <h2>Select Dryers</h2>
                <div className="machine-status">
                    {[...Array(8)].map((_, index) => {
                        const machineLabel = `Dryer ${index + 1}`;
                        const isUnavailable = machineStatus[machineLabel] === 'in_use';
                        return (
                            <div 
                                key={machineLabel} 
                                className={`machine ${isUnavailable ? 'unavailable' : 'available'}`} 
                                onClick={() => openPopup('Dryer', index + 1)}
                                style={{ cursor: isUnavailable ? 'not-allowed' : 'pointer' }}
                            >
                                D{index + 1}
                            </div>
                        );
                    })}
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