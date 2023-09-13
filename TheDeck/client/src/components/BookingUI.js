import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

];

function BookingUI() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numGuests, setNumGuests] = useState(1); // Initial number of guests is 1
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Selected room ID

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
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

  const handleRoomSelection = (roomId) => {
    // Set the selected room ID
    setSelectedRoomId(roomId);
  };

  let totalAmount = 0;
  let nightlyRate = 0;

  if (checkInDate && checkOutDate && selectedRoomId) {
    const numDays = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    // Find the selected room based on the ID
    const selectedRoom = roomData.find((room) => room.id === selectedRoomId);

    if (selectedRoom) {
      nightlyRate = selectedRoom.nightlyRate;
      totalAmount = nightlyRate * numDays;
    }
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
      <div className="room-selection">
        <label>Select a Room: </label>
        <select
          value={selectedRoomId}
          onChange={(e) => handleRoomSelection(parseInt(e.target.value))}
        >
          <option value={null}>Select a room</option>
          {roomData.map((room) => (
            <option key={room.id} value={room.id}>
              Room {room.id}
            </option>
          ))}
        </select>
      </div>
      <div className="guests-container">
        <label>Number of Guests: </label>
        <button onClick={handleDecrementGuests}>-</button>
        <span>{numGuests}</span>
        <button onClick={handleIncrementGuests}>+</button>
      </div>
      <div className="total-amount">
        <p>Total: R{totalAmount.toFixed(2)}</p>
        <p>Nightly Rate: R{nightlyRate.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default BookingUI;
