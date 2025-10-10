const express = require("express");
const axios = require("axios");
const router = express.Router();

const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
const ELEVEN_LABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const aiService = require("../utils/aiService");

// Helper: Format script
function formatScript(script) {
  script = script.replace(/\*\*/g, "");
  script = script.replace(/\*/g, "");
  script = script.replace(/#+\s+(.+)/g, "$1");
  script = script.replace(/\n{3,}/g, "\n\n");
  return script;
}

// Helper: Generate audio using 11Labs
async function generateAudio(text, voiceId) {
  if (!text || text.trim() === "") return null;
  const maxLength = 800;
  let processedText = text;
  if (text.length > maxLength) {
    const lastPeriodIndex = text.substring(0, maxLength).lastIndexOf(".");
    const truncateIndex = lastPeriodIndex > 0 ? lastPeriodIndex + 1 : maxLength;
    processedText = text.substring(0, truncateIndex);
    processedText += " [Text truncated to fit within character limit]";
  }
  try {
    // Use multilingual model for Hindi
    let model_id = "eleven_monolingual_v1";
    if (voiceId === "FmBhnvP58BK0vz65OOj7" || voiceId === "FFmp1h1BMl0iVHA0JxrI") {
      model_id = "eleven_multilingual_v2";
    }
    const audioResponse = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: processedText,
        model_id,
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
      },
      {
        headers: {
          Accept: "audio/mpeg",
          "xi-api-key": ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    if (!audioResponse.data || audioResponse.data.length === 0) {
      console.error("ElevenLabs API returned empty audio data.");
      return null;
    }
    return Buffer.from(audioResponse.data).toString("base64");
  } catch (error) {
    if (error.response) {
      console.error(
        "ElevenLabs API error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Audio generation error:", error.message);
    }
    return null;
  }
}

// POST /api/generate-podcast
router.post("/generate-podcast", async (req, res) => {
  try {
    const { topic, scriptOverride, voiceId, audioOnly, language } = req.body;
    if (!topic && !scriptOverride)
      return res.status(400).json({ error: "Topic or script is required" });
    let script = scriptOverride;
    // Build prompt in selected language
    let systemPrompt;
    if (!scriptOverride && !audioOnly) {
      if (language === "hi") {
        systemPrompt =
          "आप एक कानूनी कहानीकार हैं। एक संक्षिप्त, सरल और आकर्षक केस-आधारित कहानी लिखें जिसमें एक व्यक्ति किसी वास्तविक जीवन की चुनौती का सामना करता है और अपने अधिकारों के लिए निम्नलिखित कानून/अनुच्छेद का उपयोग करता है। कहानी में:\n- एक संबंधित पात्र हो (नाम दें)\n- समस्या या अन्याय दिखाएँ\n- कैसे वह इस कानून/अनुच्छेद को खोजता और उपयोग करता है\n- स्पष्ट रूप से समझाएँ कि यह कानून उसकी मदद कैसे करता है\n- सकारात्मक परिणाम और एक सरल सीख के साथ समाप्त करें।\nकानूनी या संवैधानिक भाषा का उपयोग न करें। इसे स्पष्ट, व्यावहारिक और आसान बनाएं। कहानी मध्यम लंबाई (8-12 वाक्य) की हो।";
      } else if (language === "gu") {
        systemPrompt =
          "તમે એક કાનૂની વાર્તાકાર છો. એક સંક્ષિપ્ત, સરળ અને આકર્ષક કેસ આધારિત વાર્તા લખો જેમાં એક વ્યક્તિ વાસ્તવિક જીવનની પડકારનો સામનો કરે છે અને તેના અધિકારો માટે નીચેના કાયદા/કલમનો ઉપયોગ કરે છે. વાર્તામાં:\n- સંબંધિત પાત્ર (નામ આપો)\n- સમસ્યા અથવા અન્યાય બતાવો\n- તે કાયદા/કલમ કેવી રીતે શોધે અને ઉપયોગ કરે છે\n- સ્પષ્ટ રીતે સમજાવો કે કાયદો તેની કેવી રીતે મદદ કરે છે\n- સકારાત્મક પરિણામ અને સરળ શીખ સાથે અંત\nકાનૂની અથવા સંવિધાનિક ભાષાનો ઉપયોગ ન કરો. તેને સ્પષ્ટ, વ્યવહારુ અને સરળ બનાવો. વાર્તા મધ્યમ લંબાઈ (8-12 વાક્ય) ની હોવી જોઈએ.";
      } else {
        systemPrompt =
          "You are a legal storyteller. Write a short, simple, and engaging case-based story that shows how a person faces a real-life challenge and uses the following law/article to fight for their rights. The story should:\n- Be about a relatable character (give them a name)\n- Show the problem or injustice they face\n- Show how they discover and use this law/article to get justice or protection\n- Clearly explain how the law helps them in their situation\n- End with a positive outcome and a simple lesson for the listener.\nDo NOT use legal or constitutional language. Make it clear, practical, and easy to follow. The story should be medium length (8-12 sentences).";
      }
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: topic },
      ];
      try {
        script = await aiService.generateWithAI(messages);
      } catch (err) {
        return res
          .status(500)
          .json({ error: "AI story generation failed", details: err.message });
      }
      script = formatScript(script);
    }
    // Select ElevenLabs voice for language
    let selectedVoiceId = voiceId || ELEVEN_LABS_VOICE_ID;
    if (!voiceId && language) {
      if (language === "hi") {
        selectedVoiceId = "FFmp1h1BMl0iVHA0JxrI"; // Hindi voice
      } else if (language === "en") {
        selectedVoiceId = "Mu5jxyqZOLIGltFpfalg"; // English voice
      } else if (language === "gu") {
        selectedVoiceId = null; // No Gujarati voice available
      }
    }
    // Generate audio for the story
    let audio = null;
    if (selectedVoiceId) {
      try {
        audio = await generateAudio(script, selectedVoiceId);
        if (!audio) throw new Error("No audio generated");
      } catch (audioError) {
        return res.status(500).json({
          script,
          audioError: "Failed to generate audio",
          details: audioError.message,
        });
      }
    } else if (language === "gu") {
      audio = null; // No Gujarati audio available
    }
    res.json({ script, audio });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate podcast", details: error.message });
  }
});

// GET /api/voices
router.get("/voices", async (req, res) => {
  try {
    const response = await axios.get("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": ELEVEN_LABS_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.json({
      voices: [
        { voice_id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel (Fallback)" },
        { voice_id: "AZnzlk1XvdvUeBnXmlld", name: "Domi (Fallback)" },
        { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Bella (Fallback)" },
      ],
    });
  }
});

module.exports = router;
