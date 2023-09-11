import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingUI from "../components/BookingUI"; // Make sure this import is correct
import { useNavigate } from "react-router-dom";

function RoomDetails() {
  const [room, setRoom] = useState({});
  const roomName = localStorage.getItem("name");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.15:8080/api/rooms/${roomName}`
      );
      setRoom(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const handleViewClick = () => {
    const roomId = room._id;
    localStorage.setItem('roomId', roomId);
    navigate('bookingsummary');
  };

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "75vh" }}>
        <img className="card-img-top" src={room.imageSrc} alt={room.name} />
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          <p className="card-text">{room.description}</p>
          <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
          <BookingUI />
          <button
            className="btn btn-primary custom-view-button"
            onClick={handleViewClick}
          >
           Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
