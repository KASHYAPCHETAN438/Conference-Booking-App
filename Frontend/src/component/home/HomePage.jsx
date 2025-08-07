import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";


const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

 const handleBookNow = () => {
  navigate('/rooms');
};
 
  return (
    <div className="home">
      {/* Banner Section */}
      <section className="banner-section">
        <img src="./assets/images/hotel.webp" alt="Conference Room" className="banner-image" />
        <div className="banner-overlay">
          <div className="banner-content">
            <h1><span className="highlight-text">Welcome to Meeting Room Booking System</span></h1>
            <p>Find, book, and manage your meetings in just a few clicks.</p>
          </div>
        </div>
      </section>

      {/* Room Search */}
      <section className="room-search-section">
        <RoomSearch onSearch={handleSearchResult} />
        {roomSearchResults.length > 0 && <RoomResult results={roomSearchResults} />}
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-content">
          <h2>Smart. Simple. Seamless Booking.</h2>
          <p>
            Experience the future of meeting management with our intuitive platform. Whether you're a small team or a large enterprise, our system helps you find the perfect space, check real-time availability, and reserve it in seconds — all without any hassle.
          </p>
        </div>
      </section>

    
    </div>
  );
};

export default HomePage;
