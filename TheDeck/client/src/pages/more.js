import React from "react";
import { useParams, Link } from "react-router-dom";
import BookingUI from "../components/BookingUI";
import roomData from "../components/rommData"; // Make sure to correct the typo here
import BookingSummaryComponent from "../components/BookingSummaryComponent"; // Renamed import

function More() {
  const { roomId } = useParams();
  const room = roomData.find((room) => room.id === parseInt(roomId));

  // if (!room) {
  //   return <div>Room not found</div>;
  // }

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: "75vh" }}>
        <img className="card-img-top" src={room.imageSrc} alt={room.name} />
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          <p className="card-text">{room.description}</p>
          <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
          <Link to={`/bookingsummary${roomId}`}>Book</Link>

          {/* Include the BookingUI component here */}
          <BookingUI />
        </div>
      </div>

      {/* Use the renamed BookingSummaryComponent */}
      <BookingSummaryComponent />
    </div>
  );
}

export default More;