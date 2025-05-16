import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChatPartners, fetchChatHistory, saveChatMessage } from '../../../api/ChattingApi';
import './Chatting.css';
import Header from '../../Header';

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

    // 상태 관리
    const [users, setUsers] = useState([]);
    const [partners, setPartners] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const currentUser = localStorage.getItem('user_id');

    // 이전에 채팅했던 상대 목록 불러오기
    useEffect(() => {
        const loadChatPartners = async () => {
            try {
                const result = await fetchChatPartners(currentUser);
                setPartners(result || []);
            } catch (error) {
                alert(`Error loading chat partners: ${error.message}`);
            }
        };
        loadChatPartners();
    }, [currentUser]);

    // 전체 유저 목록 불러오기
    useEffect(() => {
        const loadUserList = async () => {
            try {
                const response = await fetch('https://stayku.onrender.com/roommate/profile-tag-all');
                const result = await response.json();
                setUsers(result);
            } catch (error) {
                alert(`Error loading user list: ${error.message}`);
            }
        };
        loadUserList();
    }, []);


    useEffect(() => {
        if (selectedUser) {
            loadChatHistory(selectedUser.user_id); // 또는 selectedUser.id
        }
    }, [selectedUser]);


    // 채팅 내역 불러오기
    const loadChatHistory = async (partnerId) => {
        try {
            const result = await fetchChatHistory(currentUser, partnerId);
            setChatHistory(result);
        } catch (error) {
            alert(`Error loading chat history: ${error.message}`);
        }
    };

    // 메시지 전송
    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            await saveChatMessage(currentUser, selectedUser.user_id, message);
            setMessage('');
            loadChatHistory(selectedUser.user_id);
        } catch (error) {
            console.error(error)
            alert(`Error sending message: ${error.response?.data?.detail || error.message || '알 수 없는 오류'}`);
        }
    };

    return (
        <div className="Chatting-container">
            {/* 상단 메뉴바 */}
            <Header />

            {/* 유저 목록 */}
            <div className="Chatting-user-list">
                <h3>전체 유저 목록</h3>

                <ul>
                    {users.map((user, index) => (
                        <li key={index} onClick={() => setSelectedUser(user)}>
                            {user.id} - {user.user_id}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 채팅 상대 목록 */}
            <div className="Chatting-partner-list">
                <h3>채팅 상대 목록</h3>
                <ul>
                    {partners.map((partner, index) => (
                        <li key={index} onClick={() => {
                            const userObj = users.find((u) => u.user_id === partner);
                            if(userObj){
                                setSelectedUser(userObj);
                            } else{
                                alert('사용자 정보를 찾을 수 없습니다.');
                            }
                        }}>
                            {partner}
                        </li>
                    ))}
                </ul>
            </div>



            {/* 채팅 창 */}
            {selectedUser && (
                <div className="Chatting-chat-box">
                    <h4>Chat with {selectedUser.user_id}</h4>
                    <div className="Chatting-chat-history">
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
                        className="Chatting-input"
                    />
                    <button onClick={sendMessage} className="Chatting-send-button">Send</button>
                </div>
            )}
        </div>
    );
}

export default Chatting;
