import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample room data (replace with your actual room data)
const roomData = [
  {
    id: 1,
    nightlyRate: 1500, // Replace with the actual nightly rate for this room
  },
  {
    id: 2,
    nightlyRate: 2500, // Replace with the actual nightly rate for this room
  },
  {
    id: 3,
    nightlyRate: 3000, // Replace with the actual nightly rate for this room
  },
  {
    id: 4,
    nightlyRate: 3500, // Replace with the actual nightly rate for this room
  },
  // Add more rooms as needed
];

function BookingUI() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [numGuests, setNumGuests] = useState(1); // Initial number of guests is 1

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const calculateTotalAmountForRoom = (roomId, numDays) => {
    const selectedRoom = roomData.find((room) => room.id === roomId);
    if (selectedRoom) {
      const nightlyRate = selectedRoom.nightlyRate;
      return nightlyRate * numDays;
    }
    return 0;
  };

  const handleIncrementGuests = () => {
    // Increase the number of guests by 1
    setNumGuests(numGuests + 1);
  };

  const handleDecrementGuests = () => {
    // Decrease the number of guests by 1, with a minimum of 1 guest
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  const calculateNightlyRate = (totalAmount, numDays) => {
    // Calculate the nightly rate based on the total amount and number of nights
    if (numDays > 0) {
      return totalAmount / numDays;
    }
    return 0;
  };

  let totalAmount = 0;
  let nightlyRate = 0;

  if (checkInDate && checkOutDate && selectedRoomId) {
    const numDays = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    totalAmount = calculateTotalAmountForRoom(selectedRoomId, numDays);
    nightlyRate = calculateNightlyRate(totalAmount, numDays);
  }

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
  
        <p>Total: R{nightlyRate.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default BookingUI;
