import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookingSummaryComponent from "../components/BookingSummaryComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Remove the redundant declaration of BookingSummary here

function BookingSummary() {
  const { name } = useParams(); 
  const [room, setRoom] = useState({});
  const navigate = useNavigate();
  const _Id = localStorage.getItem('roomId')
 
  useEffect(() => {
    fetchRoomDetails();
  }, [_Id]); 

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${_Id}`);
      setRoom(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      navigate("/error"); 
    }
  };

  const handleViewClick = () => {
    navigate("payment");
  };

  return (
    <div className="container mt-4">
      {room && (
        <div className="card" style={{ width: "75vh" }}>
          <img className="card-img-top" src={room.imageSrc} alt={room.name} />
          <div className="card-body">
            <h5 className="card-title">{room.name}</h5>
            <p className="card-text">{room.description}</p>
            <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
            <BookingSummaryComponent />
            <button
              className="btn btn-primary custom-view-button"
              onClick={handleViewClick}
            >
              View Booking Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingSummary;
