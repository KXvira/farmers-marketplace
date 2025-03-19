const winston = require("winston");
const path = require("path");

// Define logging format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: "info", // Default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new winston.transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" }), // Errors only
        new winston.transports.File({ filename: path.join(__dirname, "../logs/combined.log") }) // All logs
    ],
});

module.exports = logger;
