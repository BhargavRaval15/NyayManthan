import api from "./api";

export const aiService = {
  // Simplify an article using AI
  async simplifyArticle(
    articleNumber,
    originalText = null,
    userId = null,
    force = true
  ) {
    try {
      console.log(
        `🔄 Frontend: Requesting AI simplification for Article ${articleNumber}`
      );

      // Build request body without null values to avoid validation errors
      const requestData = {
        articleNumber,
        force, // Always force fresh generation by default
      };

      // Only add optional fields if they have values
      if (originalText) {
        requestData.originalText = originalText;
      }
      if (userId) {
        requestData.userId = userId;
      }

      console.log("📤 Request data:", requestData);

      const response = await api.post("/ai/simplify", requestData);

      console.log("📥 Response received:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Frontend AI Service Error:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw this.handleError(error);
    }
  },

  // AI-powered article navigation (Phase 2)
  async navigateToArticle(query, userId = null) {
    try {
      const response = await api.post("/ai/navigate", {
        query,
        userId,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get AI service statistics
  async getAIStats() {
    try {
      const response = await api.get("/ai/stats");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Check AI service health
  async checkAIHealth() {
    try {
      const response = await api.get("/ai/health");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.error || "AI service error",
        message:
          error.response.data?.message || "AI service is currently unavailable",
        fallback: error.response.data?.fallback || null,
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: "Network error",
        message:
          "Unable to connect to AI service. Please check your internet connection.",
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: "Unknown error",
        message:
          error.message || "An unexpected error occurred with AI service",
      };
    }
  },
};

export default aiService;
