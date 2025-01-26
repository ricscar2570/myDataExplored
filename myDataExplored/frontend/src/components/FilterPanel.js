// Import required libraries
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Material-UI components

// FilterPanel component
function FilterPanel({ setCategory }) {
  // Handle changes in the selected category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update the category state in the parent component
  };

  return (
    <FormControl fullWidth margin="normal">
      {/* Input label for the dropdown */}
      <InputLabel id="category-label">Filter by Category</InputLabel>
      {/* Dropdown menu for selecting a category */}
      <Select
        labelId="category-label" // Links the label to the dropdown
        id="category-select" // Unique ID for the dropdown
        onChange={handleCategoryChange} // Triggered when the selection changes
      >
        {/* Dropdown options */}
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Finance">Finance</MenuItem>
        <MenuItem value="Health">Health</MenuItem>
        <MenuItem value="Education">Education</MenuItem>
      </Select>
    </FormControl>
  );
}

// Export the FilterPanel component
export default FilterPanel;
