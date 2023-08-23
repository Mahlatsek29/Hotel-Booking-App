import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate function
import adminData from '../components/adminData.json';

function SignIn() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const user = adminData.admin.find(
      user => user.userName === userName && user.password === password
    );
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/bookingsummary');
      }
    } else {
      alert('Invalid username or password');
    }
  };

  const wrapperStyle = {
    maxWidth: '350px',
    minHeight: '500px',
    margin: '80px auto',
    padding: '40px 30px 30px 30px',
    backgroundColor: '#ecf0f3',
    borderRadius: '15px',
    boxShadow: '13px 13px 20px #cbced1, -13px -13px 20px #fff',
  };

  const logoStyle = {
    width: '80px',
    margin: 'auto',
  };

  const logoImgStyle = {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '50%',
    boxShadow: '0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7, -8px -8px 15px #fff',
  };

  const nameStyle = {
    fontWeight: '600',
    fontSize: '1.4rem',
    letterSpacing: '1.3px',
    paddingLeft: '10px',
    color: '#555',
  };

  const formFieldStyle = {
    width: '100%',
    display: 'block',
    border: 'none',
    outline: 'none',
    background: 'none',
    fontSize: '1.2rem',
    color: '#666',
    padding: '10px 15px 10px 10px',
  };

  const formFieldWrapperStyle = {
    paddingLeft: '10px',
    marginBottom: '20px',
    borderRadius: '20px',
    boxShadow: 'inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff',
  };

  const buttonStyle = {
    boxShadow: 'none',
    width: '100%',
    height: '40px',
    backgroundColor: ' #806043',
    color: '#fff',
    borderRadius: '25px',
    letterSpacing: '1.3px',
    boxShadow: '3px 3px 3px #b1b1b1',
  };

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '0.8rem',
    color: '#03A9F4',
    cursor: 'pointer',
  };


  return (
    <div style={wrapperStyle}>
      <div style={logoStyle}>
        <img src="img/LOGO.png" alt="" style={logoImgStyle} />
      </div>
      <div className="text-center mt-4" style={nameStyle}>
        SIGN-IN
      </div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="far fa-user"></span>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            style={formFieldStyle}
          />
        </div>
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            style={formFieldStyle}
          />
        </div>
        <button className="btn mt-3" style={buttonStyle} onClick={handleSignIn}>
          SIGN IN
        </button>
      </form>
      <div className="text-center fs-6">
        <p>
          Forgot password? or{' '}
          <span style={linkStyle} onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </p>
      </div>
      {/* Add a button to navigate to admin */}
      <button className="btn mt-3" style={buttonStyle} onClick={() => navigate('/admin')}>
        Go to Admin Page
      </button>
    </div>
  );
}

export default SignIn;
