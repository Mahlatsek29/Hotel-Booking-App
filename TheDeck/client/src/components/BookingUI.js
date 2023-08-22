import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import roomData from "../components/rommData"; // Import your roomData array

function BookingUI() {
  const [numGuests, setNumGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleIncrementGuests = () => {
    setNumGuests(numGuests + 1);
  };

  const handleDecrementGuests = () => {
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const nightlyRate = 1000; // Assuming a nightly rate of $100
      return nights * numGuests * nightlyRate;
    }
    return 0;
  };

  return (
    <div>
      <div className="guests-container">
        <label>Number of Guests: </label>
        <button onClick={handleDecrementGuests}>-</button>
        <span>{numGuests}</span>
        <button onClick={handleIncrementGuests}>+</button>
      </div>
      <br />
      <div className="date-range-picker-container">
        <label>Check-in Date: </label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          placeholderText="Select check-in date"
          className="form-control"
        />
        <label>Check-out Date: </label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate}
          placeholderText="Select check-out date"
          className="form-control"
        />
      </div>
      <br />
      <div className="total-amount">
        <p>Total Amount: R{calculateTotalAmount()} </p>
      </div>
      <div className="book-now-button">
        <Link to="/signin" className="btn btn-primary custom-view-button">
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default BookingUI;
