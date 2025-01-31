// Import the required libraries from Winston
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Define a custom format for log messages
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add a timestamp to each log
  format.printf(
    ({ timestamp, level, message }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}` // Customize the log message format
  )
);

// Create the logger instance
const logger = createLogger({
  level: 'info', // Default logging level
  format: logFormat, // Apply the custom format
  transports: [
    // Console transport: Logs messages to the console
    new transports.Console(),

    // File transport: Logs messages to a file
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'), // Log file location
    }),
  ],
});

// Export the logger instance
module.exports = logger;
