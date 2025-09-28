const mongoose = require("mongoose");

const simplificationLogSchema = new mongoose.Schema(
  {
    articleNumber: {
      type: String,
      required: true,
      ref: "Article",
    },
    userId: {
      type: String,
      default: "anonymous",
    },
    originalText: {
      type: String,
      required: true,
    },
    simplifiedText: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      default: "gpt-3.5-turbo",
    },
    tokensUsed: {
      type: Number,
      default: 0,
    },
    responseTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    quality: {
      type: String,
      enum: ["excellent", "good", "average", "poor", null],
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    isSuccessful: {
      type: Boolean,
      default: true,
    },
    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying by article and date
simplificationLogSchema.index({ articleNumber: 1, createdAt: -1 });

module.exports = mongoose.model("SimplificationLog", simplificationLogSchema);
