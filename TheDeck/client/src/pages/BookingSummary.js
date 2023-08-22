import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

function BookingSummary({ checkInDate, checkOutDate, numGuests }) {
  const [editing, setEditing] = useState(false);
  const [editedCheckInDate, setEditedCheckInDate] = useState(checkInDate || new Date());
  const [editedCheckOutDate, setEditedCheckOutDate] = useState(checkOutDate || new Date());
  const [editedNumGuests, setEditedNumGuests] = useState(numGuests || 0);

  const calculateTotalAmount = () => {
    const pricePerNight = 1500; // Change this to your actual price per night
    return editedNumGuests * nights * pricePerNight;
  };

  const nights = editedCheckInDate && editedCheckOutDate
    ? Math.ceil((editedCheckOutDate - editedCheckInDate) / (1000 * 60 * 60 * 24))
    : 0;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Handle the save button click here
    // For example: update the booking information and exit edit mode
    setEditing(false);
  };

  return (
    <div className="card w-50">
      <img src="/img/Room8.jpg" alt="Booking" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">Booking Summary</h5>
        {editing ? (
          <>
            <p className="card-text">
              Check-in:{' '}
              <input
                type="date"
                value={editedCheckInDate.toISOString().split('T')[0]}
                onChange={(e) => setEditedCheckInDate(new Date(e.target.value))}
              />
            </p>
            <p className="card-text">
              Check-out:{' '}
              <input
                type="date"
                value={editedCheckOutDate.toISOString().split('T')[0]}
                onChange={(e) => setEditedCheckOutDate(new Date(e.target.value))}
              />
            </p>
            <p className="card-text">
              Number of Guests:{' '}
              <input
                type="number"
                value={editedNumGuests}
                onChange={(e) => setEditedNumGuests(parseInt(e.target.value))}
              />
            </p>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p className="card-text">Check-in: {editedCheckInDate.toLocaleDateString()}</p>
            <p className="card-text">Check-out: {editedCheckOutDate.toLocaleDateString()}</p>
            <p className="card-text">Number of Guests: {editedNumGuests}</p>
            <p className="card-text">Nights: {nights}</p>
            <p className="card-text">Total Amount: R{calculateTotalAmount()}</p>
            <button onClick={handleEditClick}>Edit</button>
            <Link to="/payment">
              <button style={{ backgroundColor: '#806043' }}>Continue</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingSummary;
