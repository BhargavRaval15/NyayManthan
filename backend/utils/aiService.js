const OpenAI = require("openai");
const SimplificationLog = require("../models/SimplificationLog");

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
  }

  /**
   * Simplify a constitutional article using OpenAI
   * @param {string} articleNumber - The article number
   * @param {string} originalText - The original article text
   * @param {string} userId - User identifier (default: 'anonymous')
   * @returns {Promise<Object>} Simplified text and metadata
   */
  async simplifyArticle(articleNumber, originalText, userId = "anonymous") {
    const startTime = Date.now();

    try {
      const prompt = this.buildSimplificationPrompt(
        articleNumber,
        originalText
      );

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: `You are a constitutional law expert who specializes in making complex legal texts accessible to ordinary citizens. Your task is to simplify constitutional articles while maintaining accuracy and legal precision.

Guidelines:
1. Use simple, everyday language
2. Avoid legal jargon where possible
3. Explain legal terms when they must be used
4. Provide real-world examples where helpful
5. Maintain the core legal meaning
6. Structure the response clearly with headings
7. Add context about why this article matters to citizens
8. Include potential real-world applications

IMPORTANT: This is about the Indian Constitution. Be accurate and unbiased.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const simplifiedText = response.choices[0].message.content;
      const tokensUsed = response.usage.total_tokens;
      const responseTime = Date.now() - startTime;

      // Log the simplification
      await this.logSimplification({
        articleNumber,
        userId,
        originalText,
        simplifiedText,
        model: this.model,
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
          model: this.model,
        },
      };
    } catch (error) {
      console.error("AI Simplification Error:", error);

      // Log the error
      await this.logSimplification({
        articleNumber,
        userId,
        originalText,
        simplifiedText: null,
        model: this.model,
        tokensUsed: 0,
        responseTime: Date.now() - startTime,
        isSuccessful: false,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
        fallback: this.generateFallbackSimplification(originalText),
      };
    }
  }

  /**
   * Build the prompt for article simplification
   * @param {string} articleNumber - The article number
   * @param {string} originalText - The original article text
   * @returns {string} The complete prompt
   */
  buildSimplificationPrompt(articleNumber, originalText) {
    return `Please simplify Article ${articleNumber} of the Indian Constitution for ordinary citizens:

ORIGINAL TEXT:
${originalText}

Please provide a simplified explanation that includes:

1. **Simple Summary**: What does this article mean in everyday language?
2. **Key Points**: Break down the main components
3. **Real-World Impact**: How does this affect citizens' daily lives?
4. **Important Terms**: Explain any legal terms that citizens should understand
5. **Examples**: Provide practical examples where relevant

Format your response clearly with these headings. Make it accessible to someone with no legal background while maintaining accuracy.`;
  }

  /**
   * Generate a basic fallback simplification when AI fails
   * @param {string} originalText - The original article text
   * @returns {string} Basic fallback text
   */
  generateFallbackSimplification(originalText) {
    return `**AI Simplification Temporarily Unavailable**

**Original Text:**
${originalText}

**Basic Guide:**
This is an important article from the Indian Constitution. For a detailed explanation, please:
1. Consult legal resources
2. Try again later when AI service is restored
3. Contact legal experts for clarification

**Note:** We're working to restore the AI simplification service. Thank you for your patience.`;
  }

  /**
   * Log simplification attempt to database
   * @param {Object} logData - The log data object
   */
  async logSimplification(logData) {
    try {
      const log = new SimplificationLog(logData);
      await log.save();
    } catch (error) {
      console.error("Failed to log simplification:", error);
    }
  }

  /**
   * Get usage statistics for monitoring
   * @returns {Promise<Object>} Usage statistics
   */
  async getUsageStats() {
    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      const [totalToday, totalAll, avgResponseTime] = await Promise.all([
        SimplificationLog.countDocuments({
          createdAt: { $gte: startOfDay },
          isSuccessful: true,
        }),
        SimplificationLog.countDocuments({ isSuccessful: true }),
        SimplificationLog.aggregate([
          { $match: { isSuccessful: true } },
          { $group: { _id: null, avgTime: { $avg: "$responseTime" } } },
        ]),
      ]);

      return {
        simplificationsToday: totalToday,
        totalSimplifications: totalAll,
        averageResponseTime: avgResponseTime[0]?.avgTime || 0,
      };
    } catch (error) {
      console.error("Error getting usage stats:", error);
      return {
        simplificationsToday: 0,
        totalSimplifications: 0,
        averageResponseTime: 0,
      };
    }
  }
}

module.exports = new AIService();
