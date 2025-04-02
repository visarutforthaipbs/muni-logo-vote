/**
 * Script to transpile and run the TypeScript script
 */

const { exec } = require("child_process");
const path = require("path");

// Get the path to the TypeScript script
const scriptPath = path.join(__dirname, "updateLogoUrls.ts");

// Command to run the TypeScript script with ts-node
const command = `npx ts-node ${scriptPath}`;

console.log(`Running: ${command}`);

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(stdout);
});
