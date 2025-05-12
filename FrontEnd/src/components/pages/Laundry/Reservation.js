import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';

function Reservation() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [reservations, setReservations] = useState([]);

    const navigate = useNavigate();

    const handleReservation = () => {
        if (!selectedDate || !selectedTime || !selectedMachine) {
            alert('모든 항목을 선택하세요.');
            return;
        }
        const newReservation = {
            machine: selectedMachine,
            date: selectedDate,
            time: selectedTime,
        };
        setReservations([...reservations, newReservation]);
        alert('예약이 완료되었습니다.');
    };

    const goToDashBoard = () => {
        navigate('/dashboard');
    };
    const goToReservation = () => {
        navigate('/laundry/reservation');
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
                                <li>Community</li>
                                <li>Matching Roommates</li>
                                <li>Categories</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Laundry
                            <ul className="submenu">
                                <li onClick={goToReservation}>Reservation</li>
                                <li>Current Situation</li>
                                <li>Help</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            About Dormitory
                            <ul className="submenu">
                                <li>News</li>
                                <li>Facilities</li>
                                <li>Event</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Help
                            <ul className="submenu">
                                <li>Email</li>
                                <li>Phone</li>
                                <li>Location</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* 예약 상태 확인 */}
            <div className="status-section">
                <h2>Available Machines</h2>
                <div className="machine-status">
                    {[...Array(8)].map((_, index) => (
                        <div 
                            key={index} 
                            className={`machine ${index === 1 ? 'in-use' : 'available'}`}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>


            {/* 예약 입력 폼 */}
            <div className="form-section">
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

                <label>Select Machine:</label>
                <select 
                    value={selectedMachine} 
                    onChange={(e) => setSelectedMachine(e.target.value)} 
                    className="form-input"
                >
                    <option value="">Choose...</option>
                    {Array.from({ length: 8 }, (_, i) => (
                        <option key={i} value={`Machine ${i + 1}`}>{`Machine ${i + 1}`}</option>
                    ))}
                </select>

                <button onClick={handleReservation} className="submit-button">Reserve</button>
            </div>

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
