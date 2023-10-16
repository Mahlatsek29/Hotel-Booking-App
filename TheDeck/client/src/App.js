// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import RoomDetails from "./pages/RoomDetails";
import BookingSummary from "./pages/BookingSummary";
import Admin from "./pages/Admin";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import LostPage from "./pages/LostPage";

function App() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/*

          */}
          <Route
            path="/(|home|about|signin|signup|userprofile|roomdetails|bookingsummary|success|cancel|error)"
            element={<Navbar />}
          />
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route
            path="/roomdetails"
            element={<RoomDetails data={{ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, numGuests, setNumGuests }} />}
          />
          <Route path="/bookingsummary" element={<BookingSummary data={{ checkInDate, checkOutDate, numGuests }} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/error" element={<LostPage />} />
        
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
