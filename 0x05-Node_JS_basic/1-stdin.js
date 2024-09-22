process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input from stdin
process.stdin.on('data', (input) => {
  const name = input.toString().trim();
  process.stdout.write(`Your name is: ${name}\n`);

  // Close the program gracefully
  process.stdout.write('This important software is now closing\n');
  process.exit();
});
