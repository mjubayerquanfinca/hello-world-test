const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/authRoutes");
const pingRoute = require("./routes/ping");

// Connect to the database
dbConnect();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", pingRoute);

// start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
