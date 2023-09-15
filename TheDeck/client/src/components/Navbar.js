import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../backgroundImage/backgroundImage.jpg';
import { useSpring, animated } from 'react-spring';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setNavbarOpen(false);
  };

  const handleButtonClick = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleProfileClick = () => {
    navigate('/signin');
    setNavbarOpen(false);
  };

  const brandSpring = useSpring({
    transform: isNavbarOpen ? 'scale(1.2)' : 'scale(1)',
  });

  const linkSpring = useSpring({
    color: isNavbarOpen ? 'rgba(76, 59, 41, 1)' : 'rgba(255, 255, 255, 0.7)',
  });

  const iconSpring = useSpring({
    transform: isNavbarOpen ? 'rotate(360deg)' : 'rotate(0deg)',
  });

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          boxShadow: '0px 5px 15px #806043',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="container-fluid">
          <button className="navbar-brand" onClick={() => handleNavigation('/home')}>
            <animated.span style={brandSpring}>The Deck Hotel</animated.span>
          </button>
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
            <animated.span style={iconSpring}>
              <span className="navbar-toggler-icon"></span>
            </animated.span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto"> {/* Use mx-auto class to center */}
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/home')}>
                  <animated.span style={{ ...linkSpring, color: '#4c3b29' }}>
                    <FontAwesomeIcon icon={faHome} /> HOME
                  </animated.span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/about')}>
                  <animated.span style={{ ...linkSpring, color: '#4c3b29' }}>
                  <FontAwesomeIcon icon={faInfoCircle} /> ABOUT
                  </animated.span>
                </button>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            {user ? (
              <h1 style={{ color: 'white' }}>{user.name}</h1>
            ) : (
              <>
              </>
            )}
            <button className="profile-icon-button" onClick={handleProfileClick}>
              <animated.div style={iconSpring} className="profile-icon">
                <FontAwesomeIcon icon={faUser} />
              </animated.div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;