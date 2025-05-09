import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/login', {
      user_id: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || '로그인 실패');
  }
};
