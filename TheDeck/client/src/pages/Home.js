import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms when the component mounts
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
                  <Link
                    to={`/roomdetails/${room.name}`}
                    className="btn btn-primary custom-view-button"
                  >
                    View
                  </Link>
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
