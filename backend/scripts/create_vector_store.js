// scripts/create_vector_store.js
// Embeds all chunk files and stores them in a Chroma vector store

const fs = require("fs");
const path = require("path");
const { Chroma } = require("langchain/vectorstores/chroma");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
require("dotenv").config();

const chunksDir = path.join(__dirname, "../books/chunks");

async function main() {
  const files = fs.readdirSync(chunksDir).filter((f) => f.endsWith(".txt"));
  const docs = files.map((file) => {
    const content = fs.readFileSync(path.join(chunksDir, file), "utf8");
    return {
      pageContent: content,
      metadata: { source: file },
    };
  });

  const vectorStore = await Chroma.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
  );

  await vectorStore.save(path.join(chunksDir, "chroma_vectorstore"));
  console.log("Vector store created and saved!");
}

main().catch(console.error);
