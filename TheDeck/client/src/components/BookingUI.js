import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calculateNightlyRate from "./calculateNightlyRate";

const roomData = [
  {
    id: 1,
    nightlyRate: 1500,
  },
  {
    id: 2,
    nightlyRate: 2500,
  },
  {
    id: 3,
    nightlyRate: 3000,
  },
  {
    id: 4,
    nightlyRate: 3500,
  },
];

function BookingUI() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    console.log('date is ', date)
    localStorage.setItem('checkInDate',date)
    console.log('checkIndate is ', checkInDate)
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    localStorage.setItem('checkOutDate',date)
    console.log('checkOutdate is ', checkOutDate)
  };

  const handleIncrementGuests = () => {
    localStorage.setItem('numGuests + 1',numGuests)
    // Increase the number of guests by 1
    setNumGuests(numGuests + 1);
    
  };

  const handleDecrementGuests = () => {
    localStorage.setItem('numGuests - 1',numGuests)
    // Decrease the number of guests by 1, with a minimum of 1 guest
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
     
    }
  };

  const calculateTotalAmount = () => {
    if (checkInDate && checkOutDate) {
      const numDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate the nightly rate based on the selected room ID (replace with your desired room ID)
      const roomIdToCalculate = 2; // Replace with the desired room ID
      const nightlyRate = calculateNightlyRate(roomIdToCalculate);

      return nightlyRate * numDays * numGuests;
    }
    return 0;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div>
      <div className="date-range-picker-container">
        <label>Check-in Date: </label>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInChange}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          placeholderText="Select check-in date"
          className="form-control"
        />
        <label>Check-out Date: </label>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutChange}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate}
          placeholderText="Select check-out date"
          className="form-control"
        />
      </div>
      <div className="guests-container">
        <label>Number of Guests: </label>
        <button onClick={handleDecrementGuests}>-</button>
        <span>{numGuests}</span>
        <button onClick={handleIncrementGuests}>+</button>
      </div>
      <div className="total-amount">
        <p>Total: R{totalAmount}</p>
      </div>
    </div>
  );
}

export default BookingUI;