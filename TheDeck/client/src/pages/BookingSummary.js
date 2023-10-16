import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

function BookingSummary({ data }) {
  const _id = localStorage.getItem("_id");
  const checkInDate = localStorage.getItem("checkInDate");
  const checkOutDate = localStorage.getItem("checkOutDate");
  const [room, setRoom] = useState({});
  const { numGuests } = data;
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
    if (checkInDate && checkOutDate && room.nightlyRate) {
      const numDays = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
      );

      const nightlyRate = room.nightlyRate;

      return nightlyRate * numDays;
    }
    return 0;
  };

  const totalAmount = calculateTotalAmount();

  const onToken = async (token) => {
    try {
      const bookingData = {
        checkInDate,
        checkOutDate,
        numGuests,
        totalAmount,
        token: token.id,
      };

      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);

      console.log("Booking successful:", response.data);

      // Navigate to the user profile after successful booking
      navigate("/userprofile");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

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

              <StripeCheckout
                amount={totalAmount * 100}
                token={onToken}
                currency="ZAR"
                stripeKey="pk_test_51NibPKEz5vk5ChZPe34ZI61ZUoZzDDVc8fGdqNHX8TfuBNVeLe6DI7EJGdrXY2XY0sFdVkHuDhIfDCdDHWMKOQUX00irW7V53a"
              >
                <button className="btn btn-primary custom-view-button">Pay</button>
              </StripeCheckout>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSummary;
