import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProfile, getProfile } from '../../api/MatchingRoommatesApi';
import './MatchingRoommates.css';

function MatchingRoommates() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');  // user_id 상태 추가
    const [isMorningPerson, setIsMorningPerson] = useState(true);
    const [isSmoker, setIsSmoker] = useState(true);
    const [snoreLevel, setSnoreLevel] = useState(3);
    const [hygieneLevel, setHygieneLevel] = useState(3);
    const [hallType, setHallType] = useState('신관');
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    // 코골이 정도 해시태그 변환
    const getSnoreLevelTag = (level) => {
        if (level <= 2) return '#코골이_적음';
        if (level === 3) return '#코골이_보통';
        return '#코골이_많음';
    };

    // 청결 정도 해시태그 변환
    const getHygieneLevelTag = (level) => {
        if (level <= 2) return '#위생_낮음';
        if (level === 3) return '#위생_보통';
        return '#위생_높음';
    };


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
    


    // 선택한 카테고리 업데이트 함수
    const updateCategories = () => {
        const categories = [];
        categories.push(isMorningPerson ? '#아침형' : '#저녁형');
        categories.push(isSmoker ? '#흡연' : '#비흡연');
        categories.push(getSnoreLevelTag(snoreLevel));  // 변환 함수 사용
        categories.push(getHygieneLevelTag(hygieneLevel));  // 변환 함수 사용
        categories.push(`#기숙사_${hallType}`);
        setSelectedCategories(categories);
    };


    useEffect(() => {
        // ✅ API로 user_id 가져오기
        const fetchUserId = async () => {
            try {
                const response = await getProfile();
                setUserId(response.user_id);  // user_id를 상태로 저장
            } catch (error) {
                console.error("유저 ID 불러오기 오류:", error);
            }
        };
        fetchUserId();
    }, []);


    // 프로필 저장 준비 함수
    const handleSaveProfile = async () => {
        updateCategories();
        const profileData = {
            user_id: userId,  // 추후 로그인 상태와 연동
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
            alert('프로필 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="matching-roommates-container">
            {/* 상단 헤더 */}
            <header className="top_left">
                <div className="logo" onClick={goToDashBoard} style={{ cursor: "pointer" }}>
                    StayKU
                </div>
                <nav className="navbar">
                    <ul className="menu">
                        <li className="menu-item">
                            Board
                            <ul className="submenu">
                                <li onClick={goToChatting}>Chatting</li>
                                <li onClick={goToMatchingRoommates}>Matching Roommates</li>
                                <li onClick={goToRoommateRegistration}>Roommate Registration</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Laundry
                            <ul className="submenu">
                                <li onClick={goToReservation}>Reservation</li>
                                <li onClick={goToLaundry_help}>Help</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            About Dormitory
                            <ul className="submenu">
                                <li onClick={goToNews}>News</li>
                                <li onClick={goToFacilities}>Facilities</li>
                                <li onClick={goToEvents}>Event</li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            Help
                            <ul className="submenu">
                                <li onClick={goToinformation}>information</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>


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
                        <option value="신관">신관 (2인)</option>
                        <option value="구관">구관 (3인)</option>
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
