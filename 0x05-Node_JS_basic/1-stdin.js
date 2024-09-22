process.stdout.write("Welcome to Holberton School, what is your name?\n");

// Listen for user input from stdin (standard input)
process.stdin.on('data', (input) => {
    const name = input.toString().trim(); // Convert input to string and remove extra spaces/newline
    console.log(`Your name is: ${name}`);
    
    // End the program after displaying the user's name
    process.exit();
});

// Listen for process exit event
process.on('exit', () => {
    console.log("This important software is now closing");
});
