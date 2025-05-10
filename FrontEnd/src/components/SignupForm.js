import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      // 회원가입 API 요청
      const response = await axios.post('https://stayku.onrender.com/auth/register', {
        user_id: userId,
        password: password,
      });

      // 회원가입 성공 시
      if (response.status === 200) {
        setMessage('회원가입이 완료되었습니다.');
      }
    } catch (error) {
      // 회원가입 실패 시
      setMessage('회원가입에 실패했습니다. 다시 시도하세요.');
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="SignupForm">
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="block mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSignup}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        회원가입
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default SignupForm;
