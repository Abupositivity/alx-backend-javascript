const express = require('express');

// Create an instance of an Express application
const app = express();

// Define a route for the root ("/") endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app for external usage (e.g., testing)
module.exports = app;
