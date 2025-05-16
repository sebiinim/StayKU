import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import { Home, Dashboard } from './Home';
import Reservation from './pages/laundry/Reservation';
import LaundryHelp from './pages/laundry/LaundryHelp';
import Events from './pages/aboutDorm/events';
import MatchingRoommates from './pages/roommate/MatchingRoommates';
import News from './pages/aboutDorm/News';
import Facilities_main from './pages/aboutDorm/Facilities_main';
import FacilitiesStudent from './pages/aboutDorm/Facilities_Student';
import FacilitiesFrontier from './pages/aboutDorm/Facilities_Frontier';
import Facilities_Frontier_room from './pages/aboutDorm/Facilities_Frontier_room';
import FacilitiesCJHouse from './pages/aboutDorm/Facilities_CJHouse';
import Facilities_CJHouse_room from './pages/aboutDorm/Facilities_CJHouse_room';
import FacilitiesAnamIHouse from './pages/aboutDorm/Facilities_AnamIHouse';
import Facilities_AnamIHouse_room from './pages/aboutDorm/Facilities_AnamIHouse_room';
import FacilitiesAnamGlobalHouse from './pages/aboutDorm/Facilities_AnamGlobalHouse';
import FacilitiesAnamGlobalHouse_room from './pages/aboutDorm/Facilities_AnamGlobalHouse_room';
import FacilitiesRoom from './pages/aboutDorm/FacilitiesRoom';
import RoommateRegistration from './pages/roommate/RoommateRegistration';
import Chatting from './pages/roommate/Chatting';

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
        <Route path="/aboutDorm" element={<aboutDorm />} />
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
