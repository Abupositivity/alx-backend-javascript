process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input from stdin
process.stdin.on('data', () => {
  const name = process.stdin.read();

  if (name) {
    process.stdout.write(`Your name is: ${name}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
