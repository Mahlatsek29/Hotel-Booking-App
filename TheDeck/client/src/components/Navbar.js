import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const navigate = useNavigate();
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setNavbarOpen(false); // Close the navbar after navigation
  };

  const handleButtonClick = () => {
    setNavbarOpen(!isNavbarOpen); // Toggle the navbar
  };

  const handleProfileClick = () => {
    navigate("/signin"); // Navigate to sign-in page
    setNavbarOpen(false); // Close the navbar
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg" style={{ boxShadow: '0px 5px 15px #806043' }}>
        <div className="container-fluid">
          {/* Navbar brand */}
          <button
            className="navbar-brand"
            onClick={() => handleNavigation("/home")}
          >
            The Deck Hotel
          </button>

          {/* Navbar toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleButtonClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar menu items */}
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleNavigation("/home")}
                >
                  HOME
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleNavigation("/about")}
                >
                  ABOUT
                </button>
              </li>
            </ul>
          </div>

          {/* Profile icon */}
          <div className="ml-auto">
            <button
              className="profile-icon-button"
              onClick={handleProfileClick} // Navigate to sign-in page
            >
              <div className="profile-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
