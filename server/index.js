const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

app.use(cors(
  {
    origin:[],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json())

/* MONGOOSE SETUP */

const PORT = 3001;
mongoose
// .connect('mongodb+srv://ayon:3360@cluster0.5p2mxru.mongodb.net/Ayon?retryWrites=true&w=majority&appName=Cluster0');
//     app.listen(PORT, () => {
//       console.log(`Server is Running at Port: ${PORT}`)
//     });
  
  .connect(process.env.MONGO_URL, {
    dbName: "Ayon",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
