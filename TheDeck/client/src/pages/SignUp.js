import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const proceedSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:8080/signup", {
          name,
          email,
          password,
          phone
        });

        toast.success("User registered successfully");
        navigate("/signin");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("An error occurred while signing up");
        }
      }
    }
  };


  const validate = () => {
    let result = true;
    if (name === "" || name === null) {
      result = false;
      toast.warning("Please enter your name");
    }
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please enter your email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a password");
    }
    if (phone === "" || phone === null) {
      result = false;
      toast.warning("Please enter your phone number");
    }
    return result;
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        minHeight: "500px",
        margin: "80px auto",
        padding: "40px 30px 30px 30px",
        backgroundColor: "#ecf0f3",
        borderRadius: "15px",
        boxShadow: "13px 13px 20px #cbced1, -13px -13px 20px #fff",
      }}
    >
      <div
        style={{
          width: "80px",
          margin: "auto",
        }}
      >
        <img
          src="img/LOGO.png"
          alt=""
          style={{
            width: "100%",
            height: "80px",
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow:
              "0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7, -8px -8px 15px #fff",
          }}
        />
      </div>
      <div
        className="text-center mt-4 name"
        style={{
          fontWeight: "600",
          fontSize: "1.4rem",
          letterSpacing: "1.3px",
          paddingLeft: "10px",
          color: "#555",
        }}
      >
        Sign-Up
      </div>
      <form className="p-3 mt-3" onSubmit={proceedSignUp}>
        <div
          className="form-field d-flex align-items-center"
          style={{
            paddingLeft: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
            boxShadow:
              "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
          }}
        >
          <span
            className="far fa-user"
            style={{
              color: "#555",
            }}
          ></span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              display: "block",
              border: "none",
              outline: "none",
              background: "none",
              fontSize: "1.2rem",
              color: "#666",
              padding: "10px 15px 10px 10px",
            }}
          />
        </div>
        <div
          className="form-field d-flex align-items-center"
          style={{
            paddingLeft: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
            boxShadow:
              "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
          }}
        >
          <span
            className="far fa-envelope"
            style={{
              color: "#555",
            }}
          ></span>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              display: "block",
              border: "none",
              outline: "none",
              background: "none",
              fontSize: "1.2rem",
              color: "#666",
              padding: "10px 15px 10px 10px",
            }}
          />
        </div>
        <div
          className="form-field d-flex align-items-center"
          style={{
            paddingLeft: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
            boxShadow:
              "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
          }}
        >
          <span
            className="fas fa-key"
            style={{
              color: "#555",
            }}
          ></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              display: "block",
              border: "none",
              outline: "none",
              background: "none",
              fontSize: "1.2rem",
              color: "#666",
              padding: "10px 15px 10px 10px",
            }}
          />
        </div>
        <div
          className="form-field d-flex align-items-center"
          style={{
            paddingLeft: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
            boxShadow:
              "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
          }}
        >
          <span
            className="fas fa-phone"
            style={{
              color: "#555",
            }}
          ></span>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              display: "block",
              border: "none",
              outline: "none",
              background: "none",
              fontSize: "1.2rem",
              color: "#666",
              padding: "10px 15px 10px 10px",
            }}
          />
        </div>
        <button
          className="btn mt-3"
          type="submit"
          style={{
            boxShadow: "none",
            width: "100%",
            height: "40px",
            backgroundColor: "#806043",
            color: "#fff",
            borderRadius: "25px",
            letterSpacing: "1.3px",
            boxShadow: "3px 3px 3px #b1b1b1, -3px -3px 3px #fff",
          }}
        >
          Sign Up
        </button>
      </form>
      <div
        className="text-center fs-6"
        style={{
          textDecoration: "none",
          fontSize: "0.8rem",
          color: "#806043",
        }}
      >
      </div>
    </div>
  );
};

export default SignUp;
