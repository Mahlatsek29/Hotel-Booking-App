import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import roomData from "./rommData"; 

function BookingUI() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const calculateTotalAmountForRoom = (roomId, numNights) => {
    const selectedRoom = roomData.find((room) => room.id === roomId);
    if (selectedRoom) {
      const nightlyRate = selectedRoom.nightlyRate;
      return nightlyRate * numNights; 
    }
    return 0;
  };

  let totalAmount = 0;

  if (checkInDate && checkOutDate && selectedRoomId) {
    const numNights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    totalAmount = calculateTotalAmountForRoom(selectedRoomId, numNights);
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
      <div className="total-amount">
        <p>
          Total Amount for the selected room: R{totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default BookingUI;
