require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Hotel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Replace this with your User model definition and import
const User = require("./models/user"); // Example path

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    
    const newUser = new User({
      fullName,
      email,
      password,
      phone
    });
    
    const savedUser = await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

// Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Replace this with your actual user authentication logic
    const isValidCredentials = await User.authenticate(email, password);

    if (isValidCredentials) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// Protected Route
app.get("/protected", (req, res) => {
  res.status(200).json({ message: "You have access to this protected route" });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started...\nClick the URL to gain access: http://localhost:${PORT}/`);
});
