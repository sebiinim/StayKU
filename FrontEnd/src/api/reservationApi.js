import axiosInstance from './axiosInstance';

// 예약 API 호출
export const reserveMachine = async (userId, machineId) => {
    try {
        const response = await axiosInstance.post('/reserve', {
            washer_id: machineId,
            user_id: userId,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '예약 실패');
    }
};

// 전체 상태 조회 API 호출
export const fetchMachineStatus = async () => {
    try {
        const response = await axiosInstance.get('/status');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '상태 조회 실패');
    }
};
