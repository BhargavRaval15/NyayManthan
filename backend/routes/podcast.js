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
    const audioResponse = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: processedText,
        model_id: "eleven_monolingual_v1",
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
    const { topic, scriptOverride, voiceId, audioOnly } = req.body;
    if (!topic && !scriptOverride)
      return res.status(400).json({ error: "Topic or script is required" });
    let script = scriptOverride;
    if (!scriptOverride && !audioOnly) {
      // Use AI to generate a simple, medium-length story for the law/article
      const messages = [
        {
          role: "system",
          content:
            "You are a legal storyteller. Write a short, simple, and engaging case-based story that shows how a person faces a real-life challenge and uses the following law/article to fight for their rights. The story should:\n- Be about a relatable character (give them a name)\n- Show the problem or injustice they face\n- Show how they discover and use this law/article to get justice or protection\n- Clearly explain how the law helps them in their situation\n- End with a positive outcome and a simple lesson for the listener.\nDo NOT use legal or constitutional language. Make it clear, practical, and easy to follow. The story should be medium length (8-12 sentences).",
        },
        {
          role: "user",
          content: topic,
        },
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
    // Generate audio for the story
    let audio = null;
    try {
      audio = await generateAudio(script, voiceId || ELEVEN_LABS_VOICE_ID);
      if (!audio) throw new Error("No audio generated");
    } catch (audioError) {
      return res.status(500).json({
        script,
        audioError: "Failed to generate audio",
        details: audioError.message,
      });
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
