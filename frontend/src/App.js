// Import required libraries and components
import React from 'react';
import { CssBaseline, Container, Typography } from '@mui/material'; // Material-UI components
import Dashboard from './components/Dashboard'; // Custom Dashboard component

// Main App component
function App() {
  return (
    <div className="App">
      {/* Apply a consistent baseline for styles across browsers */}
      <CssBaseline />
      
      {/* Container to center and constrain the content */}
      <Container maxWidth="md">
        {/* Header with the application title */}
        <Typography variant="h4" align="center" gutterBottom>
          MyDataExplored Dashboard
        </Typography>

        {/* Render the Dashboard component */}
        <Dashboard />
      </Container>
    </div>
  );
}

// Export the App component as the default export
export default App;
