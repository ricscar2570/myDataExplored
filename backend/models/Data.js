// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Data model
const DataSchema = new mongoose.Schema({
  // Category field: A required string indicating the category of the data
  category: { 
    type: String, 
    required: true 
  },
  // Value field: A required number indicating the value of the data
  value: { 
    type: Number, 
    required: true 
  },
  // Timestamp field: A date indicating when the data was created
  // Defaults to the current date and time if not provided
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

// Create indexes for improved query performance
// Index on 'category' for fast category-based searches
DataSchema.index({ category: 1 });

// Index on 'timestamp' (descending order) for time-based queries
DataSchema.index({ timestamp: -1 });

// Export the Data model based on the defined schema
module.exports = mongoose.model('Data', DataSchema);
