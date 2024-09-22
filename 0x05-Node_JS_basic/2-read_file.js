const fs = require('fs');

function countStudents(path) {
  try {
    // Read the CSV file synchronously
    const data = fs.readFileSync(path, 'utf8');
    
    // Split the file content into lines
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Extract the headers and student data (skip the first line, which is the header)
    const studentRecords = lines.slice(1);

    // Object to store the field-wise students data
    const studentsByField = {};

    // Iterate through each student record
    studentRecords.forEach((line) => {
      const [firstname, , , field] = line.split(',');

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }

      studentsByField[field].push(firstname);
    });

    // Total number of students
    const totalStudents = studentRecords.length;
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field and their first names
    for (const field in studentsByField) {
      const students = studentsByField[field];
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    // Handle file not found or any other errors
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
