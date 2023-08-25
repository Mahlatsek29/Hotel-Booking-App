import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RoomDetails from './pages/RoomDetails';
import BookingSummary from './pages/BookingSummary';
import Payment from './pages/Payment';
import AdminPage from './pages/AdminPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add the Navbar component here */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/roomdetails/:name" component={RoomDetails} />
          <Route path="/bookingsummary/:roomId" element={<BookingSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
