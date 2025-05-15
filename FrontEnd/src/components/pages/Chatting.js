import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 경로 수정
import { fetchChatPartners, fetchChatHistory, saveChatMessage } from 'api/chatApi';

function Chatting() {
    const navigate = useNavigate();

    // 상태 관리
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const currentUser = localStorage.getItem('user_id');

    // 페이지 이동 함수
    const goToDashboard = () => navigate('/dashboard');
    const goToChatting = () => navigate('/Chatting');
    const goToReservation = () => navigate('/laundry/reservation');
    const goToLaundry_help = () => navigate('/LaundryHelp');
    const goToEvents = () => navigate('/Events');
    const goToinformation = () => navigate('/information');
    const goToMatchingRoommates = () => navigate('/MatchingRoommates');
    const goToNews = () => navigate('/News');
    const goToFacilities = () => navigate('/Facilities');
    const goToRoommateRegistration = () => navigate('/RoommateRegistration');

    // 채팅 상대 목록 불러오기
    useEffect(() => {
        const loadChatPartners = async () => {
            try {
                const result = await fetchChatPartners(currentUser);
                setPartners(result);
            } catch (error) {
                alert(`Error loading chat partners: ${error.message}`);
            }
        };
        loadChatPartners();
    }, [currentUser]);

    // 채팅 내역 불러오기
    const loadChatHistory = async (partner) => {
        try {
            const result = await fetchChatHistory(currentUser, partner);
            setChatHistory(result);
            setSelectedPartner(partner);
        } catch (error) {
            alert(`Error loading chat history: ${error.message}`);
        }
    };

    // 메시지 전송
    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            await saveChatMessage(currentUser, selectedPartner, message);
            setMessage('');
            loadChatHistory(selectedPartner);  // 메시지 전송 후 대화 갱신
        } catch (error) {
            alert(`Error sending message: ${error.message}`);
        }
    };

    return (
        <div className="Chatting">
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
                                <li onClick={goToLaundry_help}>Help</li>
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
                                <li onClick={goToinformation}>Information</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* 채팅 기능 */}
            <div className="chatting-container">
                <h3>Chatting</h3>
                <div className="chat-partner-list">
                    <h4>Chat Partners</h4>
                    <ul>
                        {partners.map((partner, index) => (
                            <li key={index}>
                                <button onClick={() => loadChatHistory(partner)}>
                                    {partner}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedPartner && (
                    <div className="chat-box">
                        <h4>Chat with {selectedPartner}</h4>
                        <div className="chat-history">
                            {chatHistory.map((chat, index) => (
                                <p key={index}>
                                    <strong>{chat.from_user}:</strong> {chat.message}
                                </p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chatting;
