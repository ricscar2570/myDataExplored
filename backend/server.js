/// Import required libraries
const express = require('express'); // Framework for building web applications
const mongoose = require('mongoose'); // Library for interacting with MongoDB
const dotenv = require('dotenv'); // For loading environment variables
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const helmet = require('helmet'); // Middleware for securing HTTP headers
const morgan = require('morgan'); // HTTP request logger
const swaggerUi = require('swagger-ui-express'); // UI for API documentation
const swaggerJsDoc = require('swagger-jsdoc'); // Generate Swagger API docs
const dataRoutes = require('./routes/data'); // Import API routes
const logger = require('./utils/logger'); // Custom logger utility

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Define the server port

// Swagger configuration for API documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Use OpenAPI 3.0.0 specification
    info: {
      title: 'MyDataExplored API', // API title
      version: '1.0.0', // API version
      description: 'API documentation for MyDataExplored', // API description
    },
    servers: [
      {
        url: 'http://localhost:5000', // Base URL for the API
      },
    ],
  },
  apis: ['./routes/*.js'], // Specify files containing API documentation comments
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Apply middlewares
app.use(express.json()); // Parse JSON payloads in requests
app.use(cors()); // Allow requests from other origins
app.use(helmet()); // Add security-related HTTP headers
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } })); // Log HTTP requests

// Set up routes
app.use('/api/data', dataRoutes); // Mount routes for data API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Serve Swagger UI for API documentation

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected successfully')) // Log success message
  .catch((err) => logger.error('MongoDB connection error:', err)); // Log error if connection fails

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`); // Log error details
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' }); // Send error response
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`); // Log message when server starts
});
