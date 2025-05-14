import axios from 'axios';

const BASE_URL = 'http://localhost:8000';  // 백엔드 주소

// 예약 API 호출
const reserveMachine = async (machineType, machineId, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/reserve`, {
        washer_id: machineId,
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || '예약 실패');
    }
  };

// 세탁기 상태 조회 API 호출
const fetchMachineStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || '상태 조회 실패');
    }
};
  
export { reserveMachine, fetchMachineStatus };