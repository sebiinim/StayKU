import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChatPartners, fetchChatHistory, saveChatMessage } from '../../api/ChattingApi';
import './Chatting.css';

function Chatting() {
    const navigate = useNavigate();

    // 페이지 이동 함수
    const goToDashboard = () => navigate('/dashboard');
    const goToChatting = () => navigate('/Chatting');
    const goToReservation = () => navigate('/laundry/reservation');
    const goToLaundry_help = () => navigate('/LaundryHelp');
    const goToEvents = () => navigate('/Events');
    const goToinformation = () => navigate('/information');
    const goToFacilities = () => navigate('/Facilities');
    const goToNews = () => navigate('/News');
    const goToMatchingRoommates = () => navigate('/MatchingRoommates');
    const goToRoommateRegistration = () => navigate('/RoommateRegistration');

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const currentUser = localStorage.getItem('user_id');

    useEffect(() => {
        const loadUserList = async () => {
            try {
                const response = await fetch('https://stayku.orender.com/roommate/profile-tag-all');
                const result = await response.json();
                setUsers(result);
            } catch (error) {
                alert(`Error loading user list: ${error.message}`);
            }
        };
        loadUserList();
    }, []);

    return (
        <div className="Chatting-container">
            {/* 상단 메뉴바 */}
            <header className="top_left">
                <div className="logo" onClick={goToDashboard} style={{ cursor: "pointer" }}>
                    StayKU
                </div>
                <nav className="navbar">
                    <ul className="menu">
                        <li className="menu-item">Board
                            <ul className="submenu">
                                <li onClick={goToChatting}>Chatting</li>
                                <li onClick={goToMatchingRoommates}>Matching Roommates</li>
                                <li onClick={goToRoommateRegistration}>Roommate Registration</li>
                            </ul>
                        </li>
                        <li className="menu-item">Laundry
                            <ul className="submenu">
                                <li onClick={goToReservation}>Reservation</li>
                                <li onClick={goToLaundry_help}>Help</li>
                            </ul>
                        </li>
                        <li className="menu-item">About Dormitory
                            <ul className="submenu">
                                <li onClick={goToNews}>News</li>
                                <li onClick={goToFacilities}>Facilities</li>
                                <li onClick={goToEvents}>Events</li>
                            </ul>
                        </li>
                        <li className="menu-item">Help
                            <ul className="submenu">
                                <li onClick={goToinformation}>Information</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* 채팅 레이아웃 */}
            <div className="Chatting-layout">
            <h1>Chatting</h1>
                {/* 유저 목록 */}
                <div className="Chatting-user-list">
                    <h3>전체 유저 목록</h3>
                    <ul>
                        {users.length === 0 ? (
                            <li>No users available</li>
                        ) : (
                            users.map((user, index) => (
                                <li key={index} onClick={() => setSelectedUser(user)}>
                                    {user.id} - {user.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* 채팅 창 */}
                {selectedUser && (
                    <div className="Chatting-chat-box">
                        <h4>Chat with {selectedUser.name}</h4>
                        <div className="Chatting-chat-history">
                            <p>태그 목록:</p>
                            <ul>
                                <li>아침형 인간: {selectedUser.is_morning_person}</li>
                                <li>흡연 여부: {selectedUser.is_smoking}</li>
                                <li>코골이 정도: {selectedUser.snore_level}</li>
                                <li>청결도: {selectedUser.hygiene_level}</li>
                            </ul>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message"
                                className="Chatting-input"
                            />
                            <button className="Chatting-send-button">Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chatting;
