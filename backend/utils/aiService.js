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
  buildSimplificationPrompt(articleNumber, originalText, language = "en") {
    let systemPrompt;
    if (language === "hi") {
      systemPrompt = `आप एक संवैधानिक कानून विशेषज्ञ और शिक्षक हैं, जिनका उद्देश्य जटिल कानूनी पाठों को आम नागरिकों के लिए सरल और समझने योग्य बनाना है। आपका कार्य है भारतीय संविधान के अनुच्छेद ${articleNumber} को आकर्षक, स्पष्ट और आसान भाषा में समझाना।\n\nनिर्देश:\n1. बहुत सरल और बातचीत की भाषा में लिखें\n2. आकर्षक शीर्षक और स्पष्ट संरचना का उपयोग करें\n3. रोज़मर्रा के जीवन से व्यावहारिक उदाहरण शामिल करें\n4. कानूनी शब्दों को आसान हिंदी में समझाएँ\n5. इसे रोचक और यादगार बनाएं\n6. बेहतर पढ़ने के लिए Markdown फॉर्मेटिंग का उपयोग करें\n\nआवश्यक प्रारूप:\n# अनुच्छेद ${articleNumber} - [सरल शीर्षक]\n**सरल सारांश:**\n[2-3 वाक्य में समझाएँ कि यह अनुच्छेद क्या करता है]\n**मुख्य बिंदु:**\n• [पहला मुख्य बिंदु]\n• [दूसरा मुख्य बिंदु]\n• [तीसरा मुख्य बिंदु]\n• [चौथा मुख्य बिंदु]\n**वास्तविक प्रभाव:**\n• **दैनिक जीवन:** [आम लोगों पर प्रभाव]\n• **सरकारी कार्य:** [सरकार क्या कर सकती है/नहीं कर सकती]\n• **कानूनी सुरक्षा:** [नागरिकों की सुरक्षा]\n• **सामाजिक न्याय:** [न्याय की बात]\n**महत्वपूर्ण शब्द:**\n• **[कानूनी शब्द 1]**: [सरल परिभाषा और उदाहरण]\n• **[कानूनी शब्द 2]**: [सरल परिभाषा और उदाहरण]\n**उदाहरण:**\n• **परिदृश्य 1:** [अनुच्छेद का व्यावहारिक उपयोग]\n• **परिदृश्य 2:** [एक और उदाहरण]\n• **परिदृश्य 3:** [वास्तविक जीवन में उपयोग]\n• **आपके लिए क्या मायने रखता है:** [व्यक्तिगत महत्व]\n---\n*यह व्याख्या नागरिकों को उनके संवैधानिक अधिकारों और सुरक्षा को समझने में मदद करने के लिए है।*`;
    } else if (language === "gu") {
      systemPrompt = `તમે એક સંવિધાનિક કાયદા નિષ્ણાત અને શિક્ષક છો, જે સામાન્ય નાગરિકો માટે જટિલ કાનૂની લખાણને સરળ અને સમજવા યોગ્ય બનાવવાનું કામ કરે છે. તમારું કાર્ય ભારતીય સંવિધાનના કલમ ${articleNumber} ને આકર્ષક, સ્પષ્ટ અને સરળ ભાષામાં સમજાવવું છે.\n\nસૂચનાઓ:\n1. સરળ, વાતચીત જેવી ભાષામાં લખો\n2. આકર્ષક શીર્ષકો અને સ્પષ્ટ બંધારણ વાપરો\n3. રોજિંદા જીવનમાંથી ઉદાહરણો આપો\n4. કાનૂની શબ્દોને સરળ ગુજરાતીમાં સમજાવો\n5. રસપ્રદ અને યાદગાર બનાવો\n6. Markdown ફોર્મેટિંગ વાપરો\n\nઆવશ્યક બંધારણ:\n# કલમ ${articleNumber} - [સરળ શીર્ષક]\n**સરળ સારાંશ:**\n[2-3 વાક્યમાં સમજાવો કે આ કલમ શું કરે છે]\n**મુખ્ય મુદ્દા:**\n• [પ્રથમ મુખ્ય મુદ્દો]\n• [બીજો મુખ્ય મુદ્દો]\n• [ત્રીજો મુખ્ય મુદ્દો]\n• [ચોથો મુખ્ય મુદ્દો]\n**વાસ્તવિક અસર:**\n• **દૈનિક જીવન:** [લોકો પર અસર]\n• **સરકારી પગલાં:** [સરકાર શું કરી શકે/ન કરી શકે]\n• **કાનૂની સુરક્ષા:** [નાગરિકોની સુરક્ષા]\n• **સામાજિક ન્યાય:** [ન્યાયની વાત]\n**મહત્વપૂર્ણ શબ્દો:**\n• **[કાનૂની શબ્દ 1]**: [સરળ વ્યાખ્યા અને ઉદાહરણ]\n• **[કાનૂની શબ્દ 2]**: [સરળ વ્યાખ્યા અને ઉદાહરણ]\n**ઉદાહરણો:**\n• **પરિસ્થિતિ 1:** [કલમનો ઉપયોગ]\n• **પરિસ્થિતિ 2:** [બીજું ઉદાહરણ]\n• **પરિસ્થિતિ 3:** [વાસ્તવિક જીવનમાં ઉપયોગ]\n• **તમારા માટે શું અર્થ છે:** [વ્યક્તિગત મહત્વ]\n---\n*આ સમજાવટ નાગરિકોને તેમના સંવિધાનિક અધિકારો અને સુરક્ષાને સમજવામાં મદદ કરવા માટે છે.*`;
    } else {
      systemPrompt = `You are a constitutional law expert and educator specializing in making complex legal texts accessible to ordinary citizens. Your task is to simplify Article ${articleNumber} of the Indian Constitution in an engaging, clear, and visually appealing format.\n\nINSTRUCTIONS:\n1. Write in simple, conversational language that anyone can understand\n2. Use compelling headings and clear structure\n3. Include practical, relatable examples from daily life\n4. Explain legal terminology in plain English\n5. Make it engaging and memorable\n6. Use proper Markdown formatting for better readability\n\nREQUIRED FORMAT (use exactly this structure):\n# Article ${articleNumber} - [Clear, Simple Title]\n**Simple Summary:**\n[Write 2-3 engaging sentences that explain what this article does in everyday language]\n**Key Points:**\n• [First main point - use simple, active voice]\n• [Second main point - include practical benefits]\n• [Third main point - explain protections/rights]\n• [Fourth main point - mention any exceptions or special cases]\n**Real-World Impact:**\n• **Daily Life:** [How this affects ordinary people]\n• **Government Actions:** [What government can/cannot do]\n• **Legal Protection:** [How citizens are protected]\n• **Social Justice:** [How this promotes fairness]\n**Important Terms:**\n• **[Legal Term 1]**: [Simple, clear definition with example]\n• **[Legal Term 2]**: [Simple, clear definition with example]\n**Examples:**\n• **Scenario 1:** [Relatable situation showing the article in action]\n• **Scenario 2:** [Another practical example]\n• **Scenario 3:** [Real-world application]\n• **What This Means for You:** [Personal relevance]\n---\n*This explanation is designed to help citizens understand their constitutional rights and protections.*`;
    }
    let userPrompt;
    if (language === "hi") {
      userPrompt = `कृपया भारतीय संविधान के अनुच्छेद ${articleNumber} को दिए गए प्रारूप में सरल हिंदी में समझाएँ:\n\nमूल पाठ:\n${originalText}`;
    } else if (language === "gu") {
      userPrompt = `કૃપા કરીને ભારતીય સંવિધાનના કલમ ${articleNumber} ને આપેલા બંધારણમાં સરળ ગુજરાતી ભાષામાં સમજાવો:\n\nમૂળ લખાણ:\n${originalText}`;
    } else {
      userPrompt = `Please simplify Article ${articleNumber} of the Indian Constitution using the exact format provided:\n\nORIGINAL TEXT:\n${originalText}`;
    }
    return [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
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

  async simplifyArticle(
    articleNumber,
    originalText,
    userId = "anonymous",
    language = "en"
  ) {
    const startTime = Date.now();
    console.log(`📚 Simplifying Article ${articleNumber}`);

    try {
      let simplifiedText;
      let model = "fallback-response";
      let tokensUsed = 0;

      // Use LangChain if enabled and available
      if (process.env.USE_LANGCHAIN === "true" && langchainAvailable) {
        try {
          // LangChain currently only supports English
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
            originalText,
            language
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
