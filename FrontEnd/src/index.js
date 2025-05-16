import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './components/Routing';  // 경로 수정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />  {/* App 대신 Routing을 렌더링 */}
  </React.StrictMode>
);
