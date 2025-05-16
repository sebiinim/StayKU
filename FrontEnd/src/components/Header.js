// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="top_left">
      <div className="logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        StayKU
      </div>
      <nav className="navbar">
        <ul className="menu">
          <li className="menu-item">
            Roommate
            <ul className="submenu">
              <li onClick={() => navigate("/chatting")}>Chatting</li>
              <li onClick={() => navigate("/match-roommates")}>Register Profile</li>
              <li onClick={() => navigate("/register-roommate")}>Roommate Registration</li>
            </ul>
          </li>
          <li className="menu-item">
            Laundry
            <ul className="submenu">
              <li onClick={() => navigate("/reservation")}>Reservation</li>
              <li onClick={() => navigate("/laundry-help")}>Help</li>
            </ul>
          </li>
          <li className="menu-item">
            About Dormitory
            <ul className="submenu">
              <li onClick={() => navigate("/news")}>News</li>
              <li onClick={() => navigate("/facilities")}>Facilities</li>
              <li onClick={() => navigate("/events")}>Event</li>
              <li onClick={() => navigate("/info")}>Information</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
