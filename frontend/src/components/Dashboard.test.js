// Import required libraries and components
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard'; // The component to be tested

// Mock the fetch API
global.fetch = jest.fn();

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all previous mock calls before each test
    fetch.mockClear();
  });

  test('renders the dashboard with a title', () => {
    // Render the Dashboard component
    render(<Dashboard />);
    
    // Assert that the title is displayed
    const title = screen.getByText(/MyDataExplored Dashboard/i);
    expect(title).toBeInTheDocument();
  });

  test('fetches and displays data on load', async () => {
    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      json: async () => [
        { category: 'Finance', value: 100 },
        { category: 'Health', value: 50 },
      ],
    });

    // Render the Dashboard component
    render(<Dashboard />);

    // Assert that the loading indicator is displayed
    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();

    // Wait for the data to be displayed
    await waitFor(() => {
      const financeData = screen.getByText(/Finance: 100/i);
      const healthData = screen.getByText(/Health: 50/i);

      expect(financeData).toBeInTheDocument();
      expect(healthData).toBeInTheDocument();
    });
  });

  test('filters data by category', async () => {
    // Mock the fetch response for all data
    fetch.mockResolvedValueOnce({
      json: async () => [
        { category: 'Finance', value: 100 },
        { category: 'Health', value: 50 },
      ],
    });

    // Mock the fetch response for filtered data
    fetch.mockResolvedValueOnce({
      json: async () => [
        { category: 'Finance', value: 100 },
      ],
    });

    // Render the Dashboard component
    render(<Dashboard />);

    // Wait for all data to be displayed
    await waitFor(() => {
      const financeData = screen.getByText(/Finance: 100/i);
      const healthData = screen.getByText(/Health: 50/i);

      expect(financeData).toBeInTheDocument();
      expect(healthData).toBeInTheDocument();
    });

    // Simulate selecting a category in the filter panel
    const categoryDropdown = screen.getByLabelText(/Filter by Category/i);
    userEvent.selectOptions(categoryDropdown, 'Finance');

    // Wait for the filtered data to be displayed
    await waitFor(() => {
      const financeData = screen.getByText(/Finance: 100/i);
      const healthData = screen.queryByText(/Health: 50/i);

      expect(financeData).toBeInTheDocument();
      expect(healthData).not.toBeInTheDocument(); // Health data should not appear
    });
  });

  test('handles errors during data fetching', async () => {
    // Mock the fetch response to reject with an error
    fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

    // Render the Dashboard component
    render(<Dashboard />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = screen.getByText(/Failed to fetch data/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
