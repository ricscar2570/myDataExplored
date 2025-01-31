// Import required libraries and components
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Alert } from '@mui/material'; // Material-UI components
import FilterPanel from './FilterPanel'; // Custom filter panel component
import ChartComponent from './ChartComponent'; // Custom chart component

// Main Dashboard component
function Dashboard() {
  const [data, setData] = useState([]); // State to store fetched data
  const [category, setCategory] = useState(''); // State to store selected category
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to store error messages

  // Fetch data when the component mounts or the category changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        // Determine the API endpoint based on the selected category
        const url = category ? `/api/data?category=${category}` : '/api/data';
        const response = await fetch(url); // Fetch data from the backend

        if (!response.ok) {
          throw new Error('Failed to fetch data'); // Throw error if response is not OK
        }

        const result = await response.json(); // Parse the JSON response
        setData(result); // Update the data state
      } catch (err) {
        setError(err.message); // Set error message if an error occurs
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [category]); // Re-run the effect when the category changes

  return (
    <Box mt={4}>
      {/* Render the FilterPanel and pass the setCategory function */}
      <FilterPanel setCategory={setCategory} />

      {/* Show a loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        // Show an error alert if an error occurs
        <Alert severity="error" mt={4}>
          {error}
        </Alert>
      ) : (
        // Render the ChartComponent with the fetched data
        <ChartComponent data={data} />
      )}
    </Box>
  );
}

// Export the Dashboard component as the default export
export default Dashboard;
