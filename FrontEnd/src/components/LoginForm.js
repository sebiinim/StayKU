import React, { useState } from 'react';
import { login } from '../api/userApi';
import { useNavigate } from 'react-router-dom';  // 라우팅을 위한 useNavigate 추가


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 로그인 결과 메시지
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
            // 입력 값에서 공백 제거
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      const data = await login(username, password);


      if (data["로그인 성공"] === username) {
        setMessage(`✅ ${data.message}`);
        localStorage.setItem('user_id', username);  // 사용자 ID 저장
        navigate('/dashboard');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ 로그인 실패: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <h2></h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '5px', width: '200px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '5px', width: '200px' }}
      />
      <button onClick={handleLogin} style={{ padding: '5px', width: '100px' }}>로그인</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
