const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    articleNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
      enum: ["III", "IV", "IV-A"],
    },
    partName: {
      type: String,
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    simplifiedText: {
      type: String,
      default: null,
    },
    keyPoints: [
      {
        type: String,
      },
    ],
    relatedArticles: [
      {
        articleNumber: String,
        title: String,
        relevance: String,
      },
    ],
    caseLaws: [
      {
        caseName: String,
        caseNumber: String,
        year: Number,
        court: String,
        summary: String,
        relevance: String,
      },
    ],
    lastSimplified: {
      type: Date,
      default: null,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search
articleSchema.index({
  title: "text",
  originalText: "text",
  simplifiedText: "text",
  tags: "text",
});

// Method to increment view count
articleSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};

// Static method to get articles by part
articleSchema.statics.getByPart = function (part) {
  return this.find({ part, isActive: true }).sort({ articleNumber: 1 });
};

// Static method to search articles
articleSchema.statics.searchArticles = function (query) {
  return this.find(
    { $text: { $search: query }, isActive: true },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });
};

module.exports = mongoose.model("Article", articleSchema);
