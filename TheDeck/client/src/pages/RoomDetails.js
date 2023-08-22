import React from "react";
import { useParams } from "react-router-dom";
import roomData from "../components/rommData";
import BookingUI from "../components/BookingUI";

function RoomDetails() {
  const { roomId } = useParams();
  const room = roomData.find(room => room.id === parseInt(roomId));

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "75vh" }}>
        <img className="card-img-top" src={room.imageSrc} alt={room.name} />
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          <p className="card-text">{room.description}</p>
          <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
          {/* Add additional details and booking functionality as needed */}
          <BookingUI />
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
