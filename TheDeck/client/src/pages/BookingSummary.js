import React from "react";
import { useParams, Link } from "react-router-dom";
import roomData from "../components/rommData";  
import BookingSummaryComponent from "../components/BookingSummaryComponent"; 

function BookingSummary() {
  const { roomId } = useParams();
  const room = roomData.find((room) => room.id === parseInt(roomId)); 

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "50%" }}>
        <div className="card-body">
          <h5 className="card-title">Booking Summary</h5>
          <p className="card-text">Room: {room.name}</p>
          <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
          {/* Display more relevant booking summary information */}
        </div>
      </div>
      <BookingSummaryComponent />
      
      {/* Add a "Continue to Payment" button */}
      <Link to={`/payment/${roomId}`} className="btn btn-primary mt-3">
        Continue
      </Link>
    </div>
  );
}

export default BookingSummary;
