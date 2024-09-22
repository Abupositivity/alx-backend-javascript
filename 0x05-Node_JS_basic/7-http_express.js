const express = require('express');
const fs = require('fs');

// Function to read students asynchronously from a CSV file
const countStudents = (databasePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');

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

      Object.keys(studentsByField).forEach((field) => {
        const students = studentsByField[field];
        result += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      });

      resolve(result.trim());
    });
  });
};

// Create an instance of an Express application
const app = express();

// Define a route for the root ("/") endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define a route for the "/students" endpoint
app.get('/students', async (req, res) => {
  res.write('This is the list of our students\n');

  const databasePath = process.argv[2]; // Get the database path from command-line arguments
  try {
    const studentsList = await countStudents(databasePath);
    res.end(studentsList);
  } catch (error) {
    res.end(error.message);
  }
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app for external usage
module.exports = app;
