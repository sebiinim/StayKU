import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';


function News() {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const goToChatting = () => {
    navigate('/Chatting');
    };

    const goToReservation = () => {
        navigate('/laundry/reservation');  
    };

    const goToLaundry_help = () => {
    navigate('/LaundryHelp'); 
    };

    const goToEvents = () => {
        navigate('/Events');  
    };

    const goToinformation = () => {
    navigate('/information');  
    };

    const goToFacilities = () => {
        navigate('/Facilities'); 
    };

    const goToNews = () => {
    navigate('/News'); 
    };

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates'); 
    };

    const goToRoommateRegistration = () => {
    navigate('/RoommateRegistration');
    };
    return (
        <div className="News">
            {/* 상단 메뉴바 */}
            <Header />

            {/* 본문 내용 */}
            <div style={{ 
                marginTop: '200px',  // 상단바 높이만큼 여백
                padding: '20px', 
                backgroundColor: '#444', 
                borderRadius: '8px', 
                maxWidth: '800px', 
                marginLeft: 'auto', 
                marginRight: 'auto',
                overflowY: 'auto', 
                maxHeight: 'calc(100vh - 70px)',  // 화면 높이에서 상단바 높이 제외
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
                    안암학사 난방종료 안내
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '5px' }}>
                    2025-04-23 (수) | 조회: 2434
                </p>
                <hr style={{ margin: '10px 0', border: '1px solid #888' }} />

                <div style={{ lineHeight: '1.6', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                    <h3>안암학사 난방종료 안내</h3>
                    <p>날씨변화 및 외기온도의 상승에 따라 다음과 같이 난방을 종료하오니 이점 양지하여 주시기 바랍니다</p>
                    <p>-  다 음  -</p>

                    <p>1. 종료일시 : 2025. 05. 01. (목) / (2025. 04. 30. (수) 까지 난방가동)</p>
                    <p>2. 대상건물 : 안암학사 전체건물 (9개 건물)</p>
                    <p>3. 난방은 중앙통제 시스템으로 전체건물 일괄 난방 종료됩니다.</p>
                    <p>   난방 종료로 인한 개인별 온도 차는 옷 및 침구류 등으로 적절히 관리 조절하여 환절기 건강에 각별히 유의하시기 바랍니다.</p>
                    <p>4. 참고사항 : 냉방가동은 난방종료 후 운휴기간을 고려하여 기계실 기기들 정비 및 점검을 마친 후</p>
                    <p>             외기온도 변화에 따라 탄력적으로 가동할 예정입니다.</p>
                    
                    <p style={{ marginTop: '20px', textAlign: 'center' }}>
                        안암학사 행정팀
                    </p>
                </div>
            </div>
        </div>

    )
}
export default News;