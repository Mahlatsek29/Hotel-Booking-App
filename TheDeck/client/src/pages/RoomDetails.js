import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms when the component mounts
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://192.168.1.15:8080/api/rooms'); // Change the URL if needed
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.map(room => (
          <li key={room._id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <img src={room.imageSrc} alt={room.name} />
            <p>Nightly Rate: {room.nightlyRate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
