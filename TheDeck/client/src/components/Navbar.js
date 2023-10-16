import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/welcome');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setNavbarOpen(false);
  };

  const handleButtonClick = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const brandSpring = useSpring({
    transform: isNavbarOpen ? 'scale(1.2)' : 'scale(1)',
  });

  const linkSpring = useSpring({
    color: isNavbarOpen ? 'rgba(76, 59, 41, 1)' : 'rgba(255, 255, 255, 0.7)',
  });

  const iconSpring = useSpring({
    transform: isNavbarOpen ? 'rotate(90deg)' : 'rotate(0deg)',
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
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
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
            <ul className="navbar-nav mx-auto">
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
                    <FontAwesomeIcon icon={faInfoCircle} /> ABOUT US
                  </animated.span>
                </button>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/login" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <div className="nav-item">
                  <button className="nav-link" onClick={() => handleNavigation('/signup')}>
                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                  </button>
                </div>
                <div className="nav-item">
                  <button className="nav-link" onClick={() => handleNavigation('/signin')}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
