import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingUI from "../components/BookingUI";
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
    const _id = room.name;
    console.log('Id is : ',_id)
    localStorage.setItem("_id", _id);
    navigate("../bookingsummary");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
        <div className="card" style={{ width: "75vh", boxShadow: "0px 5px 15px #806043" }}>
          <img className="card-img-top" src={room.imageSrc} alt={room.name} />
          <div className="card-body">
            <h5 className="card-title">{room.name}</h5>
            <p className="card-text">{room.description}</p>
            <BookingUI />
            <button
              className="btn btn-primary custom-view-button"
              onClick={() => handleViewClick(room.name)}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
