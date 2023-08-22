import React from "react";
import { Link } from "react-router-dom";
import roomData from "../components/rommData";

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4 card-container">
          {roomData.map((room) => (
            <div className="col" key={room.id}>
              <div className="card card-equal-height">
                <img src={room.imageSrc} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <Link
                    to={`/roomdetails/${room.id}`}
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
