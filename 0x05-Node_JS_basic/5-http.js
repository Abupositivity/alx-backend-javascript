const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to read students asynchronously
const countStudents = (databasePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');

      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const studentRecords = lines.slice(1); // Remove the header
      const studentsByField = {};

      studentRecords.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      });

      const totalStudents = studentRecords.length;
      let result = `Number of students: ${totalStudents}\n`;

      for (const field in studentsByField) {
        const students = studentsByField[field];
        result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      resolve(result.trim());
    });
  });
};

// Create the HTTP server
const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    // Handle the root path "/"
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Handle the path "/students"
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    const databasePath = process.argv[2]; // Get the database path from command-line arguments
    try {
      const studentsList = await countStudents(databasePath);
      res.end(studentsList);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app
module.exports = app;
