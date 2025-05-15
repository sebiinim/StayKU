import axiosInstance from './axiosInstance';

export const reserveMachine = async (userId, machineId) => {
    try {
        const response = await axiosInstance.post('/washer/reserve', {
            washer_id: machineId,
            user_id: userId,
        });
        if (response.status !== 200) {
            throw new Error('예약 실패');
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '예약 실패');
    }
};

export const fetchMachineStatus = async () => {
    try {
        const response = await axiosInstance.get('/washer/status');
        console.log(response)
        if (response.status !== 200) {
            throw new Error('상태 조회 실패');
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '상태 조회 실패');
    }
};