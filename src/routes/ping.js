const express = require("express");
const router = express.Router();

// ✅ Simple health check route
router.get("/ping", (req, res) => {
    res.status(200).json({ 
        message: "Server is alive",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ✅ Root route for basic health check
router.get("/", (req, res) => {
    res.status(200).json({ 
        message: "Hello World API is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;
