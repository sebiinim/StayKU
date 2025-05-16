import React from 'react';
import { useNavigate } from 'react-router-dom';
import './information.css';
import Header from '../../Header';

function Information() {
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
        <div className="information-container">
            {/* 상단 메뉴바 */}
            <Header />

            {/* 주요시설 연락처 */}
            <div className="information-title">
                <h1>주요시설 연락처</h1>
            </div>

            <div className="contact-grid">
                {/* 학생동 */}
                <div className="contact-card">
                    <h3>학생동</h3>
                    <div className="main-phone">
                        <span className="label">대표전화</span>
                        <span className="phone-number">02-3290-1552</span>
                    </div>
                    <div className="sub-contacts">
                        <div className="sub-contact">
                            <span className="label">경비실(남)</span>
                            <span>02-3290-1753</span>
                        </div>
                        <div className="sub-contact">
                            <span className="label">경비실(여)</span>
                            <span>02-3290-1754</span>
                        </div>
                    </div>
                </div>

                {/* 프런티어관 */}
                <div className="contact-card">
                    <h3>프런티어관</h3>
                    <div className="main-phone">
                        <span className="label">대표전화</span>
                        <span className="phone-number">02-3290-9684(입사상담), 02-3290-1553</span>
                    </div>
                    <div className="sub-contacts">
                        <div className="sub-contact">
                            <span className="label">경비실(남)</span>
                            <span>02-3290-9682</span>
                        </div>
                        <div className="sub-contact">
                            <span className="label">경비실(여)</span>
                            <span>02-3290-9681</span>
                        </div>
                    </div>
                </div>

                {/* 국제기숙사(학부) */}
                <div className="contact-card">
                    <h3>국제기숙사(학부)</h3>
                    <div className="main-phone">
                        <span className="label">대표전화</span>
                        <span className="phone-number">02-3290-1554</span>
                    </div>
                    <div className="sub-contacts">
                        <div className="sub-contact">
                            <span className="label">CJ I-HOUSE 경비실</span>
                            <span>02-3290-1806</span>
                        </div>
                        <div className="sub-contact">
                            <span className="label">안암 I-HOUSE 경비실</span>
                            <span>02-3290-9583</span>
                        </div>
                    </div>
                </div>

                {/* 교원 및 대학원동 */}
                <div className="contact-card">
                    <h3>교원 및 대학원동</h3>
                    <div className="main-phone">
                        <span className="label">대표전화</span>
                        <span className="phone-number">02-3290-1555</span>
                    </div>
                    <div className="sub-contacts">
                        <div className="sub-contact">
                            <span className="label">안암 I-HOUSE 경비실</span>
                            <span>02-3290-9583</span>
                        </div>
                        <div className="sub-contact">
                            <span className="label">글로벌하우스 경비실</span>
                            <span>02-3290-0690</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;
