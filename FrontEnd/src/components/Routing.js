import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Home, Dashboard } from './Home';
import Reservation from './pages/Laundry/Reservation';
import LaundryHelp from './pages/LaundryHelp';
import Events from './pages/Events';
import Information from './pages/information';
import MatchingRoommates from './pages/MatchingRoommates';
import News from './pages/News';
import Facilities_main from './pages/Facilities_main';
import FacilitiesStudent from './pages/Facilities_Student';
import FacilitiesFrontier from './pages/Facilities_Frontier';
import Facilities_Frontier_room from './pages/Facilities_Frontier_room';
import FacilitiesCJHouse from './pages/Facilities_CJHouse';
import Facilities_CJHouse_room from './pages/Facilities_CJHouse_room';
import FacilitiesAnamIHouse from './pages/Facilities_AnamIHouse';
import Facilities_AnamIHouse_room from './pages/Facilities_AnamIHouse_room';
import FacilitiesAnamGlobalHouse from './pages/Facilities_AnamGlobalHouse';
import FacilitiesAnamGlobalHouse_room from './pages/Facilities_AnamGlobalHouse_room';
import FacilitiesRoom from './pages/FacilitiesRoom';
import RoommateRegistration from './pages/RoommateRegistration';
import Chatting from './pages/Chatting';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/laundry/reservation" element={<Reservation />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/information" element={<Information />} />
        <Route path="/MatchingRoommates" element={<MatchingRoommates />} />
        <Route path="/News" element={<News />} />
        <Route path="/facilities" element={<Facilities_main />} />
        <Route path="/facilities/student" element={<FacilitiesStudent />} />
        <Route path="/facilities/frontier" element={<FacilitiesFrontier />} />
        <Route path="/facilities/frontier/room" element={<Facilities_Frontier_room />} />
        <Route path="/facilities/cjhouse" element={<FacilitiesCJHouse />} />
        <Route path="/facilities/cjhouse/room" element={<Facilities_CJHouse_room />} />
        <Route path="/facilities/anamihouse" element={<FacilitiesAnamIHouse />} />
        <Route path="/facilities/anamihouse/room" element={<Facilities_AnamIHouse_room />} />
        <Route path="/facilities/anamglobalhouse" element={<FacilitiesAnamGlobalHouse />} />
        <Route path="/facilities/anamglobalhouse/room" element={<FacilitiesAnamGlobalHouse_room />} />
        <Route path="/facilities/room" element={<FacilitiesRoom />} />
        <Route path="/LaundryHelp" element={<LaundryHelp />} />
        <Route path="/RoommateRegistration" element={<RoommateRegistration />} />
        <Route path="/Chatting" element={<Chatting />} />
      </Routes>
    </Router>
  );
}

export default Routing;
