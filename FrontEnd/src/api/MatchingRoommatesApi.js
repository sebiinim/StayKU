import axios from './axiosInstance';

// 프로필 저장 API 호출
export const saveProfile = async (profileData) => {
    try {
        // API 경로 수정: /roommate/profile
        const response = await axios.post('/roommate/profile', profileData);
        return response.data;
    } catch (error) {
        console.error('프로필 저장 중 오류:', error);
        throw error;
    }
};

// 프로필 조회 API 호출
export const getProfile = async (userId) => {
    try {
        // API 경로 수정: /roommate/profile-value
        const response = await axios.get(`/roommate/profile-value/${userId}`);
        return response.data;
    } catch (error) {
        console.error('프로필 조회 중 오류:', error);
        throw error;
    }
};

// 사용자 태그 조회 API 호출
export const getUserTags = async (userId) => {
    try {
        // API 경로 수정: /roommate/profile-tag
        const response = await axios.get(`/roommate/profile-tag/${userId}`);
        return response.data;
    } catch (error) {
        console.error('사용자 태그 조회 중 오류:', error);
        throw error;
    }
};

// 전체 사용자 태그 조회 API 호출
export const getAllUserTags = async () => {
    try {
        // API 경로 수정: /roommate/profile-tag-all
        const response = await axios.get(`/roommate/profile-tag-all`);
        return response.data;
    } catch (error) {
        console.error('전체 사용자 태그 조회 중 오류:', error);
        throw error;
    }
};
