/**
 * Script to update municipality logo URLs in the CSV file
 * Links municipality codes with images from GitHub repository
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const INPUT_CSV_PATH = path.join(process.cwd(), "public", "muni-data-link.csv");
const OUTPUT_CSV_PATH = path.join(
  process.cwd(),
  "public",
  "muni-data-link-updated.csv"
);
const GITHUB_LOGO_BASE_URL =
  "https://raw.githubusercontent.com/visarutforthaipbs/muni-vote-logo/main/logos/";

async function updateLogoUrls() {
  console.log("Starting logo URL update process...");

  try {
    // Create read and write streams
    const readStream = fs.createReadStream(INPUT_CSV_PATH, {
      encoding: "utf8",
    });
    const writeStream = fs.createWriteStream(OUTPUT_CSV_PATH, {
      encoding: "utf8",
    });

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;
    let headers: string[] = [];
    let logoIndex = -1;
    let muniCodeIndex = -1;

    // Process the CSV line by line
    for await (const line of rl) {
      if (isFirstLine) {
        // Handle header row
        headers = line.split(",");
        logoIndex = headers.findIndex((h) => h.trim() === "logo");
        muniCodeIndex = headers.findIndex((h) => h.trim() === "muni_code");

        if (logoIndex === -1) {
          throw new Error('Could not find "logo" column in CSV');
        }

        if (muniCodeIndex === -1) {
          throw new Error('Could not find "muni_code" column in CSV');
        }

        writeStream.write(line + "\n");
        isFirstLine = false;
        continue;
      }

      // Process data rows
      const values = line.split(",");

      if (values.length <= logoIndex || values.length <= muniCodeIndex) {
        // Skip malformed lines
        console.warn("Skipping malformed line:", line);
        writeStream.write(line + "\n");
        continue;
      }

      const muniCode = values[muniCodeIndex].trim();

      if (muniCode) {
        // Replace the logo URL with the GitHub URL
        const newLogoUrl = `${GITHUB_LOGO_BASE_URL}${muniCode}.png`;
        values[logoIndex] = newLogoUrl;
      }

      writeStream.write(values.join(",") + "\n");
    }

    console.log("Logo URLs updated successfully!");
    console.log(`Updated CSV saved to: ${OUTPUT_CSV_PATH}`);

    // Replace original file with updated file
    fs.renameSync(OUTPUT_CSV_PATH, INPUT_CSV_PATH);
    console.log("Original CSV file replaced with updated version.");
  } catch (error) {
    console.error("Error updating logo URLs:", error);
  }
}

// Run the script
updateLogoUrls();
