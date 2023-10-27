require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { v4: uuid4 } = require('uuid');
const Stripe = require('stripe')('sk_test_51NibPKEz5vk5ChZPfbx0Vfdrql1Y2rvjCF9b2oWRD8mT7zZyChEl9GZqlU73exMWsu06k2Zpoa9yNjKpoGAKmYm800j2PYgZcR'); 
const RoomDetails = require("./models/roomDetails");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/Hotel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

  app.post("/payment", async (req, res) => {
    try {
      const { checkInDate, checkOutDate, numGuests, totalAmount, items, token } = req.body;
  
      const customer = await Stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const payment = await Stripe.charges.create({
        amount: totalAmount * 100, // Amount in cents
        currency: "ZAR", 
        customer: customer.id,
        receipt_email: token.email,
        idempotencyKey: uuid4()
      });
  
      res.status(200).json({ message: "Payment Successful, Your Room is booked" });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(400).json({ error: "Payment processing failed" });
    }
  });
  

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const newUser = new User({
      name,
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

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const token = generateToken(email);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.get("/api/rooms", async (req, res) => {
  try {
    const allRooms = await RoomDetails.find();
    res.status(200).json(allRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "An error occurred while fetching rooms" });
  }
});

// Define other routes as needed

function generateToken(email) {
  return jwt.sign({ email }, "your_secret_key", {
    expiresIn: "1h",
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started...\nClick the URL to gain access: http://localhost:${PORT}/`);
});
