import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import roomData from "../components/rommData"; // Make sure the path is correct based on your project structure

function BookingUI() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const selectedRoomIds = [3, 4]; // Change this to the desired room IDs

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const calculateTotalAmountForRoom = (roomId, numNights) => {
    const selectedRoom = roomData.find((room) => room.id === roomId);
    if (selectedRoom) {
      console.log('selected room:',selectedRoom)
      console.log('amount: ',selectedRoom.nightlyRate)
      return selectedRoom.nightlyRate; // Just the nightly rate for one night
    }
    return 0;
  };

  let totalAmount = 0;
  if (checkInDate && checkOutDate) {
    const numNights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    totalAmount = selectedRoomIds.reduce(( roomId) => {
      console.log ("roomId.nr", roomId.nightlyRate)
      const roomTotal = roomData .nightlyRate* numNights
      return  roomTotal;
    }, 0);
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
      <br />
      <div className="total-amount">
        <p>
          Total Amount for{" "}
          {checkInDate && checkOutDate
            ? `${(checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)} nights`
            : "0 nights"}
          : R{totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default BookingUI;
