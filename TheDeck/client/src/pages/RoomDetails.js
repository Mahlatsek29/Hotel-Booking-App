import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

function RoomDetails() {
  const imageStyle = {
    maxWidth: "50%",
    height: "auto",
  };

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const nightlyRate = 1500;

  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      return nights * numGuests * nightlyRate;
    }
    return 0;
  };

  const handleDecrementGuests = () => {
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  const handleIncrementGuests = () => {
    setNumGuests(numGuests + 1);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="card card-equal-height">
          <img
            src="/img/Room8.jpg"
            className="card-img-top"
            alt=""
            style={imageStyle}
          />
          <div className="card-body">
            <p className="card-text">
              Discover simplicity and comfort in our Standard Room.
              Unwind in a well-appointed space with all the essentials
              for a relaxing stay. Whether you're here for business or
              leisure, our Standard Room provides a convenient and
              welcoming home base for your journey.
            </p>
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
                onChange={date => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Select check-in date"
                className="form-control"
              />
              <label>Check-out Date: </label>
              <DatePicker
                selected={checkOutDate}
                onChange={date => setCheckOutDate(date)}
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
              <p>Total Amount: R{calculateTotalAmount()}<br/> Per Night</p>
            </div>
            <div className="book-now-button">
              <Link to="/signin" className="btn btn-primary custom-view-button">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
