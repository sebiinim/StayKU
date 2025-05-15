import axiosInstance from './axiosInstance';

// 예약 요청 함수
export const reserveMachine = async (type, machineId, userId) => {
    try {
        const endpoint = type === 'washer' ? '/washer/reserve' : '/dryer/reserve';

        // 데이터 형식 검증 및 전송
        const requestData = {
            [`${type}_id`]: parseInt(machineId),  // 숫자형 변환 필수
            user_id: String(userId)               // 문자열로 변환
        };

        console.log("예약 요청 데이터:", requestData);  // 디버깅용

        const response = await axiosInstance.post(endpoint, requestData);

        if (response.status !== 200) {
            throw new Error('예약 실패');
        }
        return response.data;
    } catch (error) {
        console.error("예약 오류:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || '예약 실패');
    }
};

// 상태 조회 함수
export const fetchMachineStatus = async () => {
    try {
        const washerResponse = await axiosInstance.get('/washer/status');
        const dryerResponse = await axiosInstance.get('/dryer/status');

        if (washerResponse.status !== 200 || dryerResponse.status !== 200) {
            throw new Error('상태 조회 실패');
        }

        // 세탁기와 건조기 상태 합치기
        const combinedData = [
            ...washerResponse.data.map(item => ({ ...item, type: 'washer' })),
            ...dryerResponse.data.map(item => ({ ...item, type: 'dryer' }))
        ];
        return combinedData;
    } catch (error) {
        console.error("상태 조회 오류:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || '상태 조회 실패');
    }
};
