// Import required libraries and components
import React from 'react';
import HighchartsReact from 'highcharts-react-official'; // React wrapper for Highcharts
import Highcharts from 'highcharts'; // Highcharts library
import { Box, Typography } from '@mui/material'; // Material-UI components

// ChartComponent: Renders an interactive chart
function ChartComponent({ data }) {
  // Prepare the chart options based on the data
  const chartOptions = {
    chart: {
      type: 'column', // Use a column chart
    },
    title: {
      text: 'Data Overview', // Title of the chart
    },
    xAxis: {
      type: 'category', // Categories on the x-axis
      title: {
        text: 'Category', // Label for the x-axis
      },
    },
    yAxis: {
      title: {
        text: 'Value', // Label for the y-axis
      },
    },
    series: [
      {
        name: 'Value', // Name of the series
        data: data.map((item) => [item.category, item.value]), // Map data to Highcharts format
        colorByPoint: true, // Assign different colors to each column
      },
    ],
  };

  return (
    <Box mt={4}>
      {/* Show a message if there is no data */}
      {data.length === 0 ? (
        <Typography variant="h6" align="center">
          No data available
        </Typography>
      ) : (
        // Render the chart if data is available
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
    </Box>
  );
}

// Export the ChartComponent
export default ChartComponent;
