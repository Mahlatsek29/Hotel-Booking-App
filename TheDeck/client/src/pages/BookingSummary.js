import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";

function BookingSummary() {
  const _id = localStorage.getItem("_id");
  const checkInDate = localStorage.getItem("checkInDate");
  const checkOutDate = localStorage.getItem("checkOutDate");
  const [room, setRoom] = useState({});
  const [numGuests, setNumGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoomDetails();
  }, [_id]);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${_id}`);
      setRoom(response.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
      navigate("/error");
    }
  };

  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const numDays = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
      );

      const nightlyRate = room.nightlyRate;

      return nightlyRate * numDays * numGuests;
    }
    return 0;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
        {room && (
          <div className="card" style={{ width: "75vh", boxShadow: "0px 5px 15px #806043" }}>
            <img className="card-img-top" src={room.imageSrc} alt={room.name} />
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">{room.description}</p>
              <p className="card-text">Nightly Rate: R{room.nightlyRate}</p>
              <p className="card-text">Check-in Date: {checkInDate}</p>
              <p className="card-text">Check-out Date: {checkOutDate}</p>
              <p className="card-text">Number of Guests: {numGuests}</p>
              <p className="card-text">Total Amount: R{totalAmount.toFixed()}</p>
            </div>
          </div>
        )}
      </div>
      {/* Render the Payment component here, outside the card */}
      <Payment
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        numGuests={numGuests}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default BookingSummary;
