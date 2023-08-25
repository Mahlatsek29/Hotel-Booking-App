import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RoomDetails() {
  const { name } = useParams();
  const [room, setRoom] = useState([]);

  useEffect(() => {
    fetchRoomDetails();
  }, [name]);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.15:8080/api/rooms/${name}`);
      console.log('Fetched room details:', response.data);
      setRoom(response.data);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card" style={{ width: '75vh' }}>
        <img className="card-img-top" src={room.imageSrc} alt={room.name} />
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          <p className="card-text">{room.description}</p>
          <p className="card-text">Nightly Rate: {room.nightlyRate}</p>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
