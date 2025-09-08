const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/authRoutes");
const pingRoute = require("./routes/ping");

// Connect to the database (non-blocking)
dbConnect().catch(err => {
    console.error("Database connection failed:", err);
    // Don't exit the process, let the server start anyway
});

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", pingRoute);
app.use("/", pingRoute); // Also mount ping route at root level

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ 
        error: "Internal server error",
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler (no path to avoid path-to-regexp wildcard issues)
app.use((req, res) => {
    res.status(404).json({ 
        error: "Route not found",
        path: req.originalUrl 
    });
});

// start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Health check available at: http://localhost:${PORT}/ping`);
    console.log(`📍 API base URL: http://localhost:${PORT}/api`);
});
