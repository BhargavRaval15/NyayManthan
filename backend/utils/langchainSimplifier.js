// backend/utils/langchainSimplifier.js
// LangChain-based AI simplification for NyayManthan

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");
const axios = require("axios");
require("dotenv").config();

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o", // or your preferred model
});

const prompt = new PromptTemplate({
  template: `
You are a legal expert. Use the following context from the Indian Constitution and trusted books to simplify the article for a layperson.

Context:
{context}

Article to simplify:
{article}

Return the answer in Markdown with headings, bullet points, and examples.
`,
  inputVariables: ["context", "article"],
});

const chain = new LLMChain({ llm, prompt });

async function getContextFromRetriever(articleText) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/retrieve", {
      query: articleText,
      k: 3,
    });
    if (res.data && res.data.chunks) {
      return res.data.chunks.join("\n\n");
    }
    return "";
  } catch (err) {
    console.error("Retriever API error:", err.message);
    return "";
  }
}

async function simplifyWithLangChain(articleText) {
  const context = await getContextFromRetriever(articleText);
  const response = await chain.call({ context, article: articleText });
  return response.text;
}

module.exports = { simplifyWithLangChain };
