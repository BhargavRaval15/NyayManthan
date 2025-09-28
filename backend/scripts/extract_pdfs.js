// scripts/extract_pdfs.js
// Extracts text from all PDFs in backend/books and saves as .txt files

const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const booksDir = path.join(__dirname, "../books");
const outputDir = path.join(__dirname, "../books/text");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(booksDir).forEach(async (file) => {
  if (file.endsWith(".pdf")) {
    const filePath = path.join(booksDir, file);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(dataBuffer);
      const txtFile = file.replace(/\.pdf$/i, ".txt");
      fs.writeFileSync(path.join(outputDir, txtFile), data.text, "utf8");
      console.log(`Extracted: ${file} -> ${txtFile}`);
    } catch (err) {
      console.error(`Failed to extract ${file}:`, err.message);
    }
  }
});
