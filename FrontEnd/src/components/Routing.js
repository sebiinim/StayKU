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
import Facilities from './pages/Facilities';
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
        <Route path="/Facilities" element={<Facilities />} />
        <Route path="/LaundryHelp" element={<LaundryHelp />} />
        <Route path="/RoommateRegistration" element={<RoommateRegistration />} />
        <Route path="/Chatting" element={<Chatting />} />
      </Routes>
    </Router>
  );
}

export default Routing;
