import axiosInstance from './axiosInstance';

// 채팅 저장 API 호출
export const saveChatMessage = async (fromUser, toUser, message) => {
    try {
        const response = await axiosInstance.post('/api/chat', {
            from_user: fromUser,
            to_user: toUser,
            message: message,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || '채팅 저장 실패');
    }
};

// 채팅 내역 조회 API 호출 (양방향)
export const fetchChatHistory = async (user1, user2) => {
    try {
        const response = await axiosInstance.get(`/api/chat/${user1}/${user2}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || '채팅 내역 조회 실패');
    }
};

// 나와 채팅했던 상대 조회 API 호출
export const fetchChatPartners = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/chat_partners/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || '채팅 상대 조회 실패');
    }
};
