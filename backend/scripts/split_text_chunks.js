// scripts/split_text_chunks.js
// Splits each .txt file in books/text into logical chunks for vector storage

const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../books/text");
const outputDir = path.join(__dirname, "../books/chunks");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const CHUNK_SIZE = 1200; // characters per chunk (adjust as needed)

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith(".txt")) {
    const filePath = path.join(inputDir, file);
    const text = fs.readFileSync(filePath, "utf8");
    const chunks = [];
    let i = 0;
    while (i < text.length) {
      let end = i + CHUNK_SIZE;
      // Try to split at the nearest newline for better chunk boundaries
      if (end < text.length) {
        const nextNewline = text.indexOf("\n", end);
        if (nextNewline !== -1 && nextNewline - i < CHUNK_SIZE * 1.5) {
          end = nextNewline + 1;
        }
      }
      chunks.push(text.slice(i, end).trim());
      i = end;
    }
    // Write each chunk to a separate file
    chunks.forEach((chunk, idx) => {
      const chunkFile = file.replace(".txt", `_chunk${idx + 1}.txt`);
      fs.writeFileSync(path.join(outputDir, chunkFile), chunk, "utf8");
    });
    console.log(`Split ${file} into ${chunks.length} chunks.`);
  }
});
