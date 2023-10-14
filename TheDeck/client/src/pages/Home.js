import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

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

  const handleViewClick = (roomName, roomId) => {
    localStorage.setItem("name", roomName);
    localStorage.setItem("_id", roomId);
    
    navigate("/roomdetails");
  };

  return (
    <div className="container">
      <div className="carousel-container">
        {" "}
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          width="120vh"
          height="400px"
          autoPlay={true}
          interval={3000}
        >
          {rooms.map((room) => (
            <div key={room._id}>
              <div
                className="card card-equal-height"
                style={{ boxShadow: "0px 5px 15px #806043" }}
              >
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
                    onClick={() => handleViewClick(room.name, room._id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;