import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";

    if (formData.fullName === '') {
      isproceed = false;
      errormessage += "Full Name";
    }
    if (formData.email === '') {
      isproceed = false;
      errormessage += "Email";
    }
    if (formData.password === '') {
      isproceed = false;
      errormessage += "Password";
    }
    if (formData.phone === '') {
      isproceed = false;
      errormessage += "Phone";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.email)) {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isproceed;
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (IsValidate()) {
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Successfully Registered.");
            navigate("/signin");
          } else {
            toast.error("Registration failed.");
          }
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
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

  return (
    <div style={wrapperStyle}>
      <div style={logoStyle}>
        <img src="img/LOGO.png" alt="" style={logoImgStyle} />
      </div>
      <div className="text-center mt-4" style={nameStyle}>
        SIGN-UP
      </div>
      <form className="p-3 mt-3" onSubmit={handleSignUp}>
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="far fa-user"></span>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            style={formFieldStyle}
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="far fa-envelope"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            style={formFieldStyle}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            style={formFieldStyle}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field d-flex align-items-center" style={formFieldWrapperStyle}>
          <span className="fas fa-phone"></span>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone"
            style={formFieldStyle}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn mt-3" style={buttonStyle} type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUp;
