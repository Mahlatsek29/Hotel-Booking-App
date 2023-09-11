import React from "react";
import { useParams } from "react-router-dom";
import roomData from "../components/rommData";

function BookingSummary() {
  const { roomid } = useParams();
  const selectedRoom = roomData.find(room => room.id === parseInt(roomid));

  if (!selectedRoom) {
    return <div></div>;
  }

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "50%" }}>
        <div className="card-body">
          <h5 className="card-title">Booking Summary</h5>
          <p className="card-text">Room: {selectedRoom.name}</p>
          <p className="card-text">Nightly Rate: R{selectedRoom.nightlyRate}</p>
          {/* Display more relevant booking summary information */}
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
