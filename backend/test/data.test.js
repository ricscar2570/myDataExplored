// Import required libraries and modules
const chai = require('chai'); // Assertion library
const chaiHttp = require('chai-http'); // Extension for HTTP request testing
const server = require('../server'); // Import the backend server
const Data = require('../models/Data'); // Import the MongoDB data model

// Use chai-http for HTTP testing
chai.use(chaiHttp);
const { expect } = chai; // Destructure expect for cleaner assertions

// Define the test suite for the Data API
describe('Data API', () => {
  // Run before each test to clear the database
  beforeEach(async () => {
    await Data.deleteMany({}); // Clear all data in the Data collection
  });

  // Test case: GET /api/data should return an empty array initially
  it('GET /api/data should return an empty array initially', (done) => {
    chai
      .request(server)
      .get('/api/data') // Send a GET request to /api/data
      .end((err, res) => {
        expect(res).to.have.status(200); // Expect HTTP status 200
        expect(res.body).to.be.an('array').that.is.empty; // Expect the response body to be an empty array
        done(); // End the test
      });
  });

  // Test case: GET /api/data/aggregate should return aggregated data
  it('GET /api/data/aggregate should return aggregated data', async () => {
    // Insert sample data into the database
    await Data.insertMany([
      { category: 'Finance', value: 100 },
      { category: 'Finance', value: 200 },
      { category: 'Health', value: 50 },
    ]);

    // Send a GET request to /api/data/aggregate
    chai
      .request(server)
      .get('/api/data/aggregate')
      .end((err, res) => {
        expect(res).to.have.status(200); // Expect HTTP status 200
        expect(res.body).to.be.an('array'); // Expect the response body to be an array

        // Verify the aggregated data
        const financeData = res.body.find((item) => item._id === 'Finance');
        const healthData = res.body.find((item) => item._id === 'Health');

        expect(financeData).to.include({ _id: 'Finance', totalValue: 300 }); // Finance total should be 300
        expect(healthData).to.include({ _id: 'Health', totalValue: 50 }); // Health total should be 50
      });
  });

  // Test case: POST /api/data should add a new data entry
  it('POST /api/data should add a new data entry', (done) => {
    const newData = { category: 'Education', value: 75 }; // Sample data

    // Send a POST request to /api/data
    chai
      .request(server)
      .post('/api/data')
      .send(newData) // Send the sample data in the request body
      .end((err, res) => {
        expect(res).to.have.status(201); // Expect HTTP status 201 (Created)
        expect(res.body).to.include(newData); // Expect the response body to include the new data
        done(); // End the test
      });
  });
});
