process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input from stdin
process.stdin.on('data', (input) => {
  const name = input.toString().trim();
  console.log(`Your name is: ${name}`);

  // End the process after displaying the message
  console.log('This important software is now closing');
  process.exit(); // Close the process
});
