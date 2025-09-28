// backend/utils/aiservice.js

const axios = require("axios");
const SimplificationLog = require("../models/SimplificationLog");
const dotenv = require("dotenv");
dotenv.config();

// LangChain integration
let langchainAvailable = false;
let simplifyWithLangChain = null;
try {
  ({ simplifyWithLangChain } = require("./langchainSimplifier"));
  langchainAvailable = true;
} catch (e) {
  langchainAvailable = false;
}

class AIService {
  constructor() {
    this.githubToken = process.env.GITHUB_TOKEN;
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.openrouterApiKey = process.env.OPENROUTER_API_KEY;

    this.aiProviders = [
      {
        name: "openrouter",
        endpoint: "https://openrouter.ai/api/v1/chat/completions",
        model: "openai/gpt-4o-mini",
        apiKey: this.openrouterApiKey,
        headers: (apiKey) => ({
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://nyaymanthan.vercel.app",
          "X-Title": "NyayManthan AI",
        }),
      },
      {
        name: "github",
        endpoint: "https://models.github.ai/inference/chat/completions",
        model: "openai/gpt-4",
        apiKey: this.githubToken,
        headers: (apiKey) => ({
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        }),
      },
      {
        name: "openai",
        endpoint: "https://api.openai.com/v1/chat/completions",
        model: "gpt-4o-mini", // cheaper + faster than GPT-4
        apiKey: this.openaiApiKey,
        headers: (apiKey) => ({
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        }),
      },
    ];

    if (this.openrouterApiKey) {
      console.log("🤖 AI Service initialized with OpenRouter");
    } else if (this.githubToken) {
      console.log("🤖 AI Service initialized with GitHub AI models");
    } else if (this.openaiApiKey) {
      console.log("🤖 AI Service initialized with OpenAI");
    } else {
      console.log("🤖 AI Service initialized with fallback responses only");
    }
  }

  /**
   * Core AI generation logic
   */
  async generateWithAI(messages) {
    let lastError = null;

    for (const provider of this.aiProviders) {
      if (!provider.apiKey) {
        console.log(`Skipping ${provider.name} - no API key provided`);
        continue;
      }

      try {
        console.log(`🤖 Trying ${provider.name} API...`);

        const response = await axios.post(
          provider.endpoint,
          {
            messages,
            model: provider.model,
            temperature: 0.7,
            max_tokens: 2000,
          },
          {
            headers: provider.headers(provider.apiKey),
            timeout: 30000,
          }
        );

        if (
          response.data &&
          response.data.choices &&
          response.data.choices[0]?.message?.content
        ) {
          console.log(`✅ Success with ${provider.name}`);
          return response.data.choices[0].message.content;
        } else {
          throw new Error("Invalid AI response format");
        }
      } catch (error) {
        lastError = error;
        console.error(`❌ ${provider.name} failed:`, error.message);

        if (error.response) {
          console.error(
            "Error details:",
            JSON.stringify(error.response.data, null, 2)
          );
        }
        continue;
      }
    }

    throw new Error(
      `All AI providers failed. Last error: ${
        lastError?.response?.data?.error?.message || lastError?.message
      }`
    );
  }

  /**
   * Prompt builder for simplification
   */
  buildSimplificationPrompt(articleNumber, originalText) {
    return [
      {
        role: "system",
        content: `You are a constitutional law expert and educator specializing in making complex legal texts accessible to ordinary citizens. Your task is to simplify Article ${articleNumber} of the Indian Constitution in an engaging, clear, and visually appealing format.

INSTRUCTIONS:
1. Write in simple, conversational language that anyone can understand
2. Use compelling headings and clear structure
3. Include practical, relatable examples from daily life
4. Explain legal terminology in plain English
5. Make it engaging and memorable
6. Use proper Markdown formatting for better readability

REQUIRED FORMAT (use exactly this structure):

# Article ${articleNumber} - [Clear, Simple Title]

**Simple Summary:**
[Write 2-3 engaging sentences that explain what this article does in everyday language]

**Key Points:**
• [First main point - use simple, active voice]
• [Second main point - include practical benefits]
• [Third main point - explain protections/rights]
• [Fourth main point - mention any exceptions or special cases]

**Real-World Impact:**
• **Daily Life:** [How this affects ordinary people]
• **Government Actions:** [What government can/cannot do]
• **Legal Protection:** [How citizens are protected]
• **Social Justice:** [How this promotes fairness]

**Important Terms:**
• **[Legal Term 1]**: [Simple, clear definition with example]
• **[Legal Term 2]**: [Simple, clear definition with example]

**Examples:**
• **Scenario 1:** [Relatable situation showing the article in action]
• **Scenario 2:** [Another practical example]
• **Scenario 3:** [Real-world application]
• **What This Means for You:** [Personal relevance]

---
*This explanation is designed to help citizens understand their constitutional rights and protections.*`,
      },
      {
        role: "user",
        content: `Please simplify Article ${articleNumber} of the Indian Constitution using the exact format provided:\n\nORIGINAL TEXT:\n${originalText}`,
      },
    ];
  }

  /**
   * Mock / fallback simplification
   */
  generateMockSimplification(articleNumber, originalText) {
    console.log(
      `🤖 Generating fallback simplification for Article ${articleNumber}`
    );
    return `# Article ${articleNumber} - Constitutional Provision (Simplified)

**Simple Summary:**
This article lays down important rules for citizens and the government.

**Key Points:**
• Defines rights and responsibilities
• Ensures fairness
• Protects against misuse of power

**Real-World Impact:**
• Affects how government treats people
• Helps citizens know their rights

---
**Note:** This is a fallback explanation. For official legal meaning, consult experts.
Generated by NyayManthan AI Assistant on ${new Date().toLocaleDateString(
      "en-IN"
    )}`;
  }

  /**
   * Main function - simplify article
   */

  async simplifyArticle(articleNumber, originalText, userId = "anonymous") {
    const startTime = Date.now();
    console.log(`📚 Simplifying Article ${articleNumber}`);

    try {
      let simplifiedText;
      let model = "fallback-response";
      let tokensUsed = 0;

      // Use LangChain if enabled and available
      if (process.env.USE_LANGCHAIN === "true" && langchainAvailable) {
        try {
          simplifiedText = await simplifyWithLangChain(originalText);
          model = "langchain/gpt-4o";
          tokensUsed = Math.floor(simplifiedText.length / 4);
        } catch (lcError) {
          console.warn(`⚠️ LangChain failed, falling back: ${lcError.message}`);
          simplifiedText = this.generateMockSimplification(
            articleNumber,
            originalText
          );
        }
      } else if (
        this.openrouterApiKey ||
        this.openaiApiKey ||
        this.githubToken
      ) {
        try {
          const messages = this.buildSimplificationPrompt(
            articleNumber,
            originalText
          );
          simplifiedText = await this.generateWithAI(messages);
          model = this.openrouterApiKey
            ? "openrouter/gpt-4o-mini"
            : this.openaiApiKey
            ? "openai/gpt-4o-mini"
            : "github/gpt-4";
          tokensUsed = Math.floor(simplifiedText.length / 4);
        } catch (aiError) {
          console.warn(`⚠️ AI failed, using fallback: ${aiError.message}`);
          simplifiedText = this.generateMockSimplification(
            articleNumber,
            originalText
          );
        }
      } else {
        simplifiedText = this.generateMockSimplification(
          articleNumber,
          originalText
        );
      }

      const responseTime = Date.now() - startTime;
      await this.logSimplification({
        articleNumber,
        userId,
        originalText,
        simplifiedText,
        model,
        tokensUsed,
        responseTime,
        isSuccessful: true,
      });

      return {
        success: true,
        simplifiedText,
        metadata: {
          tokensUsed,
          responseTime,
          model,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error(
        `❌ Error simplifying Article ${articleNumber}:`,
        error.message
      );
      return {
        success: false,
        simplifiedText: this.generateMockSimplification(
          articleNumber,
          originalText
        ),
        metadata: { model: "error-fallback", error: error.message },
      };
    }
  }

  /**
   * Log results to DB
   */
  async logSimplification(logData) {
    try {
      const log = new SimplificationLog(logData);
      await log.save();
      console.log(
        `📝 Logged simplification for Article ${logData.articleNumber}`
      );
    } catch (error) {
      console.error("Failed to log simplification:", error.message);
    }
  }
}

module.exports = new AIService();
