import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://192.168.1.15:8080/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleViewClick = (roomName) => {
    localStorage.setItem('name', roomName);
    navigate('/roomdetails');
  };

  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4 card-container">
          {rooms.map((room) => (
            <div className="col" key={room._id}>
              <div className="card card-equal-height">
                <img
                  src={room.imageSrc}
                  className="card-img-top"
                  alt={room.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
            
                  <button
                    className="btn btn-primary custom-view-button"
                    onClick={() => handleViewClick(room.name)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
