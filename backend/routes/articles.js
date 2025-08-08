const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { body, validationResult } = require("express-validator");

// Get all articles with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const { part, page = 1, limit = 20, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { isActive: true };

    // Filter by part if specified
    if (part) {
      query.part = part;
    }

    let articles;
    let total;

    if (search) {
      // Text search
      articles = await Article.searchArticles(search)
        .skip(skip)
        .limit(parseInt(limit));
      total = await Article.countDocuments({
        $text: { $search: search },
        isActive: true,
      });
    } else {
      // Regular query
      articles = await Article.find(query)
        .sort({ articleNumber: 1 })
        .skip(skip)
        .limit(parseInt(limit));
      total = await Article.countDocuments(query);
    }

    res.json({
      success: true,
      data: articles,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch articles",
      message: error.message,
    });
  }
});

// Get articles by part
router.get("/part/:part", async (req, res) => {
  try {
    const { part } = req.params;

    if (!["III", "IV", "IV-A"].includes(part)) {
      return res.status(400).json({
        success: false,
        error: "Invalid part. Must be III, IV, or IV-A",
      });
    }

    const articles = await Article.getByPart(part);

    res.json({
      success: true,
      data: articles,
      count: articles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch articles by part",
      message: error.message,
    });
  }
});

// Get single article by number
router.get("/:articleNumber", async (req, res) => {
  try {
    const { articleNumber } = req.params;

    const article = await Article.findOne({
      articleNumber,
      isActive: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    // Increment view count
    await article.incrementViewCount();

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch article",
      message: error.message,
    });
  }
});

// Create new article (admin only - to be secured later)
router.post(
  "/",
  [
    body("articleNumber").notEmpty().withMessage("Article number is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("part").isIn(["III", "IV", "IV-A"]).withMessage("Invalid part"),
    body("partName").notEmpty().withMessage("Part name is required"),
    body("originalText").notEmpty().withMessage("Original text is required"),
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

      const article = new Article(req.body);
      await article.save();

      res.status(201).json({
        success: true,
        data: article,
        message: "Article created successfully",
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "Article with this number already exists",
        });
      }

      res.status(500).json({
        success: false,
        error: "Failed to create article",
        message: error.message,
      });
    }
  }
);

// Update article (admin only - to be secured later)
router.put(
  "/:articleNumber",
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("originalText")
      .optional()
      .notEmpty()
      .withMessage("Original text cannot be empty"),
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

      const { articleNumber } = req.params;
      const updates = req.body;

      const article = await Article.findOneAndUpdate(
        { articleNumber, isActive: true },
        updates,
        { new: true, runValidators: true }
      );

      if (!article) {
        return res.status(404).json({
          success: false,
          error: "Article not found",
        });
      }

      res.json({
        success: true,
        data: article,
        message: "Article updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to update article",
        message: error.message,
      });
    }
  }
);

// Search articles
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const articles = await Article.searchArticles(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Article.countDocuments({
      $text: { $search: query },
      isActive: true,
    });

    res.json({
      success: true,
      data: articles,
      searchQuery: query,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Search failed",
      message: error.message,
    });
  }
});

module.exports = router;
