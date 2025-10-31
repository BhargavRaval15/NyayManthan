const express = require("express");
const router = express.Router();
const aiService = require("../utils/aiService");
const Article = require("../models/Article");
const { body, validationResult } = require("express-validator");

// Simplify an article
router.post(
  "/simplify",
  [
    body("articleNumber").notEmpty().withMessage("Article number is required"),
    body("originalText")
      .optional()
      .notEmpty()
      .withMessage("Original text cannot be empty"),
    body("userId")
      .optional()
      .isString()
      .withMessage("User ID must be a string"),
    body("force").optional().isBoolean().withMessage("Force must be a boolean"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { articleNumber, originalText, userId, force, language } = req.body;

      // If no original text provided, fetch from database
      let textToSimplify = originalText;
      let article = null;

      if (!textToSimplify) {
        article = await Article.findOne({
          articleNumber,
          isActive: true,
        });

        if (!article) {
          return res.status(404).json({
            success: false,
            error: "Article not found",
          });
        }

        textToSimplify = article.originalText;
      }

      // Only use cache if not forced and simplified very recently (within 5 minutes)
      if (
        !force &&
        article &&
        article.simplifiedText &&
        article.lastSimplified
      ) {
        const minutesSinceSimplification =
          (Date.now() - article.lastSimplified) / (1000 * 60);

        // If simplified within last 5 minutes, return cached version
        if (minutesSinceSimplification < 5) {
          console.log(
            `🔄 Returning cached simplification for Article ${articleNumber}`
          );
          return res.json({
            success: true,
            data: {
              articleNumber,
              originalText: textToSimplify,
              simplifiedText: article.simplifiedText,
              cached: true,
              lastSimplified: article.lastSimplified,
            },
          });
        }
      }

      console.log(
        `🆕 Generating fresh AI simplification for Article ${articleNumber}`
      );

      // Generate new simplification
      const result = await aiService.simplifyArticle(
        articleNumber,
        textToSimplify,
        userId || "anonymous",
        language || "en"
      );

      if (result.success) {
        // Update article with new simplification if it exists in database
        if (article) {
          article.simplifiedText = result.simplifiedText;
          article.lastSimplified = new Date();
          await article.save();
        }

        res.json({
          success: true,
          data: {
            articleNumber,
            originalText: textToSimplify,
            simplifiedText: result.simplifiedText,
            metadata: result.metadata,
            cached: false,
          },
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to simplify article",
          message: result.error,
          fallback: result.fallback,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
);

// Get AI usage statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = await aiService.getUsageStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get AI statistics",
      message: error.message,
    });
  }
});

// AI-powered article search/navigation
router.post(
  "/navigate",
  [
    body("query").notEmpty().withMessage("Query is required"),
    body("userId")
      .optional()
      .isString()
      .withMessage("User ID must be a string"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { query, userId } = req.body;

      // This is a placeholder for Phase 2 - AI-powered navigation
      // For now, we'll do a simple text search
      const articles = await Article.searchArticles(query).limit(5);

      res.json({
        success: true,
        data: {
          query,
          suggestedArticles: articles,
          message: "AI-powered navigation coming in Phase 2",
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Navigation failed",
        message: error.message,
      });
    }
  }
);

// Health check for AI service
router.get("/health", async (req, res) => {
  try {
    // Test a simple AI call
    const testResult = await aiService.simplifyArticle(
      "TEST",
      "This is a test article for health check.",
      "health-check"
    );

    res.json({
      success: true,
      aiService: testResult.success ? "operational" : "degraded",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      aiService: "down",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;
