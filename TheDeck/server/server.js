require('dotenv').config()
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const RoomDetails = require("./models/roomDetails")

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

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "zar",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

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
    console.log("Sign-in request received:", req.body);
    
    const { email, password } = req.body;
    console.log("Email:", email);

    const user = await User.findOne({ email }); 
    console.log("User:", user);

    if (user) {
     
      const token = generateToken(email);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    console.error("Error message:", error.message);
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

app.get("/api/rooms/:name", async (req, res) => {
  console.log('this api is bein called')
  try {
    const room = await RoomDetails.findOne({ name: req.params.name });
    if (!room) {
      res.status(404).json({ error: "Room not found" });
    } else {
      res.status(200).json(room);
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "An error occurred while fetching room" });
  }
});

function generateToken(email) {
  
  return jwt.sign({ email }, "your_secret_key", {
    expiresIn: "1h",
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started...\nClick the URL to gain access: http://localhost:${PORT}/`);
});
