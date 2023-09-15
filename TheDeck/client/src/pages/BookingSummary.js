import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingSummaryComponent from "../components/BookingSummaryComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function BookingSummary() {
  const _id  = localStorage.getItem('_id');
  const checkInDate =  localStorage.getItem('checkInDate')
  const checkOutDate =  localStorage.getItem('checkOutDate')
  console.log('checkoutdate is ',checkOutDate, ' checkindate is ',checkInDate )
  const [room, setRoom] = useState({});
  const [numGuests, setNumGuests] = useState(1); // Define number of guests

  const navigate = useNavigate();
  console.log('ID is : ',_id);

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

  const handleViewClick = () => {
    navigate("signin");
  };

  // Define the totalAmount calculation based on nightly rate, check-in date, check-out date, and number of guests
  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const numDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate the nightly rate based on the selected room ID
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
              <BookingSummaryComponent />
              <button
                className="btn btn-primary custom-view-button"
                onClick={handleViewClick }
              >
               Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSummary;
