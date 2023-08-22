import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Your navigation bar or header can go here */}

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4 card-container">
          {/* Card 1 */}
          <div className="col">
            <div className="card card-equal-height">
              <img src="/img/Room8.jpg" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Standard</h5>
                <p className="card-text">
                  Discover simplicity and comfort in our Standard Room.
                  Unwind in a well-appointed space with all the essentials
                  for a relaxing stay. Whether you're here for business or
                  leisure, our Standard Room provides a convenient and
                  welcoming home base for your journey.
                </p>
                <Link to="/roomdetails" className="btn btn-primary custom-view-button">
                  View
                </Link>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col">
            <div className="card card-equal-height">
              <img src="/img/Room6.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Junior Suite</h5>
                <p className="card-text">
                  Introducing our Junior Suite, specially designed for young
                  adventurers! This magical space combines a cozy bedroom
                  and a fun sitting area. Whether playing games or dreaming
                  big, your kids will have a blast. Our Junior Suite is the
                  perfect place for their exciting journey, offering comfort
                  and excitement all in one.
                </p>
                <Link to="/roomdetails" className="btn btn-primary custom-view-button">
                  View
                </Link>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col">
            <div className="card card-equal-height">
              <img src="/img/Room7.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Coastal Vista</h5>
                <p className="card-text">
                  Welcome to our Coastal Vista room, where the beauty of the
                  ocean unfolds before your eyes. Relax in this serene space
                  that offers unobstructed views of the beach and the shimmering
                  waters beyond. Whether you're starting your day with a sunrise
                  over the waves or unwinding with the sunset's golden hues, the
                  Coastal Vista room provides a front-row seat to nature's
                  captivating show. Immerse yourself in the soothing ambiance of
                  the ocean, right from the comfort of your own private retreat.
                </p>
                <Link to="/roomdetails" className="btn btn-primary custom-view-button">
                  View
                </Link>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col">
            <div className="card card-equal-height">
              <img src="/img/room4.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Jacuzzi/Hot Tub Suite</h5>
                <p className="card-text">
                  Indulge in our Jacuzzi/Hot Tub Suite—a haven of luxury. Sink
                  into plush furnishings in the living area, then unwind in a
                  private Jacuzzi with cascading water features and rose petals.
                  The bedroom offers a king-sized bed by candlelight. Refresh in
                  the rainfall shower of the sleek en-suite bathroom. Ideal for
                  romance or relaxation, our suite is your escape into serenity
                  and opulence. Book now and embrace the ultimate in luxury
                  living.
                </p>
                <Link to="/roomdetails" className="btn btn-primary custom-view-button">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your footer can go here */}...
    </div>
  );
};

export default Home;
