// Import required libraries and data model
const express = require('express'); // Express framework
const Data = require('../models/Data'); // MongoDB schema for data entries

// Create an Express router
const router = express.Router();

/**
 * GET /api/data
 * Fetch all data entries
 */
router.get('/', async (req, res, next) => {
  try {
    const data = await Data.find(); // Retrieve all data from the database
    res.json(data); // Send data as JSON response
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

/**
 * GET /api/data/aggregate
 * Fetch aggregated data by category
 */
router.get('/aggregate', async (req, res, next) => {
  try {
    const aggregatedData = await Data.aggregate([
      {
        $group: {
          _id: '$category', // Group data by the 'category' field
          totalValue: { $sum: '$value' }, // Calculate the sum of 'value' for each category
        },
      },
    ]);
    res.json(aggregatedData); // Send aggregated data as JSON response
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

/**
 * POST /api/data
 * Add a new data entry
 */
router.post('/', async (req, res, next) => {
  try {
    const { category, value } = req.body; // Extract data from the request body
    if (!category || value === undefined) {
      // Validate input
      return res.status(400).json({ error: 'Category and value are required' });
    }
    const newData = new Data({ category, value }); // Create a new Data document
    const savedData = await newData.save(); // Save the document to the database
    res.status(201).json(savedData); // Send the saved document as JSON response
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

/**
 * DELETE /api/data/:id
 * Delete a data entry by its ID
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const deletedData = await Data.findByIdAndDelete(id); // Delete the document by ID
    if (!deletedData) {
      return res.status(404).json({ error: 'Data entry not found' }); // Handle case where entry is not found
    }
    res.json({ message: 'Data entry deleted successfully' }); // Send success message
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

/**
 * PUT /api/data/:id
 * Update a data entry by its ID
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const { category, value } = req.body; // Extract data from the request body
    if (!category && value === undefined) {
      // Validate input
      return res.status(400).json({ error: 'At least one field (category or value) is required for update' });
    }
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { category, value },
      { new: true } // Return the updated document
    );
    if (!updatedData) {
      return res.status(404).json({ error: 'Data entry not found' }); // Handle case where entry is not found
    }
    res.json(updatedData); // Send the updated document as JSON response
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

// Export the router to be used in server.js
module.exports = router;
