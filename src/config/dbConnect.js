const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        if (!process.env.CONNECTION_STRING) {
            throw new Error("CONNECTION_STRING environment variable is not set");
        }
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            `MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`
        );
        return connect;
    } catch (err) {
        console.error("Database connection error:", err.message);
        throw err; // Re-throw to be handled by caller
    }
};

module.exports = dbConnect;
