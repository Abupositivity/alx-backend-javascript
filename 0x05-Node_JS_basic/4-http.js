const http = require('http');

// Create the HTTP server
const app = http.createServer((req, res) => {
  // Set the response headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Send the response body
  res.end('Hello Holberton School!');
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app for external usage (e.g., testing)
module.exports = app;
