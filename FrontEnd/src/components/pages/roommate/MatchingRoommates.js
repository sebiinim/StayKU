import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../../../api/MatchingRoommatesApi';
import './MatchingRoommates.css';
import Header from '../../Header';

function MatchingRoommates() {
    const navigate = useNavigate();
    const [isMorningPerson, setIsMorningPerson] = useState(true);
    const [isSmoker, setIsSmoker] = useState(true);
    const [snoreLevel, setSnoreLevel] = useState(3);
    const [hygieneLevel, setHygieneLevel] = useState(3);
    const [hallType, setHallType] = useState('new_man');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const user_id = localStorage.getItem('user_id');

    // 페이지 이동 함수
    const goToDashBoard = () => navigate('/dashboard');
    const goToChatting = () => navigate('/Chatting');
    const goToLaundry_help = () => navigate('/LaundryHelp');
    const goToEvents = () => navigate('/Events');
    const goToinformation = () => navigate('/information');
    const goToFacilities = () => navigate('/Facilities');
    const goToNews = () => navigate('/News');
    const goToMatchingRoommates = () => navigate('/MatchingRoommates');
    const goToRoommateRegistration = () => navigate('/RoommateRegistration');
    const goToReservation = () => navigate('/laundry/reservation');

    // // 코골이 정도 해시태그 변환
    // const getSnoreLevelTag = (level) => {
    //     if (level <= 2) return '코골이 적음';
    //     if (level === 3) return '코골이 보통';
    //     return '#코골이_많음';
    // };

    // // 청결 정도 해시태그 변환
    // const getHygieneLevelTag = (level) => {
    //     if (level <= 2) return '#위생_낮음';
    //     if (level === 3) return '#위생_보통';
    //     return '#위생_높음';
    // };


    // 슬라이더 값 변경 시 채우기 업데이트
    const updateSliderFill = (e) => {
        const value = e.target.value;
        const max = e.target.max;
        const percent = ((value - 1) / max) * 120;
        e.target.style.setProperty('--percent', `${percent}%`);
    };


    useEffect(() => {
        const snoreSlider = document.getElementById("snore-slider");
        const hygieneSlider = document.getElementById("hygiene-slider");
        updateSliderFill({ target: snoreSlider });
        updateSliderFill({ target: hygieneSlider });
    }, []);
    


    // // 선택한 카테고리 업데이트 함수
    // const updateCategories = () => {
    //     const categories = [];
    //     categories.push(isMorningPerson ? '#아침형' : '#저녁형');
    //     categories.push(isSmoker ? '#흡연' : '#비흡연');
    //     categories.push(snoreLevel);  // 변환 함수 사용
    //     categories.push(hygieneLevel);  // 변환 함수 사용
    //     categories.push(hallType);
    //     setSelectedCategories(categories);
    // };


    // useEffect(() => {
    //     // ✅ API로 user_id 가져오기
    //     const fetchUserId = async () => {
    //         try {
    //             const response = await getProfile();
    //             setUserId(response.user_id);  // user_id를 상태로 저장
    //         } catch (error) {
    //             console.error("유저 ID 불러오기 오류:", error);
    //         }
    //     };
    //     fetchUserId();
    // }, []);


    // // 사용자 ID 불러오기 함수
    // const fetchUserId = () => {
    //     try {
    //         // 로컬 스토리지에서 유저 정보 가져오기
    //         const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    //         if (!userInfo || !userInfo.user_id) {
    //             throw new Error('로그인 정보가 없습니다.');
    //         }

    //         return userInfo.user_id;
    //     } catch (error) {
    //         console.error('유저 ID 불러오기 오류:', error.message);
    //         alert('로그인 정보가 없습니다. 로그인을 먼저 해주세요.');
    //         navigate('/login');  // 로그인 페이지로 이동
    //         return null;
    //     }
    // };


    // 프로필 저장 호출 함수
    const handleSaveProfile = async () => {
        // updateCategories();

        const profileData = {
            user_id: user_id,  // 
            is_morning_person: isMorningPerson,
            is_smoker: isSmoker,
            snore_level: snoreLevel,
            hygiene_level: hygieneLevel,
            hall_type: hallType,
        };

        try {
            await saveProfile(profileData);
            alert('프로필이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('프로필 저장 중 오류:', error.response?.data || error.message);
            alert(`프로필 저장 중 오류: ${error.response?.data?.detail || error.message}`);
        }
    };

    return (
        <div className="matching-roommates-container">
            {/* 상단 헤더 */}
            <Header />


            {/* 카테고리 선택 박스 */}
            <div className="category-box">
                <h2>Select Categories</h2>

                {/* 토글 버튼 그룹 */}
                <div className="category-item">
                    <label>아침형 (ON) / 저녁형 (OFF)</label>
                    <div className="toggle-button">
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isMorningPerson} onChange={() => setIsMorningPerson(!isMorningPerson)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="category-item">
                    <label>흡연 (ON) / 비흡연 (OFF)</label>
                    <div className="toggle-button">
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isSmoker} onChange={() => setIsSmoker(!isSmoker)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/* 슬라이더 그룹 */}
                <div className="slider-item">
                    <label>코골이 수준: {snoreLevel}</label>
                    <input 
                        type="range" 
                        id="snore-slider"
                        min="1" 
                        max="5" 
                        value={snoreLevel} 
                        onChange={(e) => {
                            setSnoreLevel(Number(e.target.value));
                            updateSliderFill(e);
                        }} 
                    />
                </div>
                    
                <div className="slider-item">
                    <label>위생 수준: {hygieneLevel}</label>
                    <input 
                        type="range" 
                        id="hygiene-slider"
                        min="1" 
                        max="5" 
                        value={hygieneLevel} 
                        onChange={(e) => {
                            setHygieneLevel(Number(e.target.value));
                            updateSliderFill(e);
                        }} 
                    />
                </div>

                {/* 드롭다운 그룹 */}
                <div className="dropdown-item">
                    <label>기숙사 선택</label>
                    <select value={hallType} onChange={(e) => setHallType(e.target.value)}>
                        <option value="new_man">신관 (남)</option>
                        <option value="new_woman">신관 (여)</option>
                        <option value="old_man">구관 (남)</option>
                        <option value="old_woman">구관 (여)</option>
                    </select>
                </div>

                <button className="submit-button" onClick={handleSaveProfile}>
                    Save Profile
                </button>

                {/* 선택한 카테고리 표시 */}
                <div className="my-categories">
                    <h3>My Categories</h3>
                    <ul>
                        {selectedCategories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MatchingRoommates;
