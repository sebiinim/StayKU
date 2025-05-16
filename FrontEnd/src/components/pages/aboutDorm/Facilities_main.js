import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Facilities.css';
import Header from '../../Header';

function FacilitiesMain() {
    const navigate = useNavigate();

    const styles = {
        container: {
            marginTop: '50px',
            backgroundColor: '#282c34',
            color: 'white',
            minHeight: '100vh',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        title: {
            textAlign: 'center',
            fontSize: '48px',
            margin: '20px',
        },
        cardContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            padding: '20px',
            justifyContent: 'center',
        },
        card: {
            backgroundColor: '#fff',
            color: '#333',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            margin: '10px',
        },
        cardTitle: {
            fontSize: '22px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#a58456',
            color: 'white',
            padding: '8px 12px',
            margin: '5px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#8a6b4a',
        },
    };

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

    const goToMatchingRoommates = () => {
        navigate('/MatchingRoommates');
    };

    const goToNews = () => {
        navigate('/News');
    };

    const goToFacilities = () => {
        navigate('/Facilities');
    };

    const goToRoommateRegistration = () => {
        navigate('/RoommateRegistration');
    };

    const goToStudent = () => navigate('/facilities/student');
    const goToFrontier = () => navigate('/facilities/frontier');
    const goToCJHouse = () => navigate('/facilities/cjhouse');
    const goToAnamIHouse = () => navigate('/facilities/anamihouse');
    const goToAnamGlobalHouse = () => navigate('/facilities/anamglobalhouse');

    return (
        <div className="FacilitiesMain" style={{ marginTop: '50px' }}>
            {/* 상단 메뉴바 */}
            <Header />

            <div style={styles.container}>
                <h1 style={styles.title}>건물현황</h1>
                <div style={styles.cardContainer}>
                    {[
                        { name: '학생동', qualification: '학부생(국내)', navigateTo: goToStudent },
                        { name: '프런티어관', qualification: '학부생(내국인)', navigateTo: goToFrontier },
                        { name: 'CJ International House', qualification: '학부생(외국인), 교원', navigateTo: goToCJHouse },
                        { name: '안암 International House', qualification: '학부생(외국인), 교원', navigateTo: goToAnamIHouse },
                        { name: '안암 글로벌하우스', qualification: '대학원생', navigateTo: goToAnamGlobalHouse },
                    ].map((facility, index) => (
                        <div key={index} style={styles.card}>
                            <h3 style={styles.cardTitle}>{facility.name}</h3>
                            <p>입주자격: {facility.qualification}</p>
                            <button style={styles.button} onClick={facility.navigateTo}>상세정보</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FacilitiesMain;
