import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function UserProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); 

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user"); // Replace with your endpoint
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <div className="card">
        <div className="card-header">
          <h1>User Profile</h1>
        </div>
        <div className="card-body">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      
    </div>
  );
}

export default UserProfile;