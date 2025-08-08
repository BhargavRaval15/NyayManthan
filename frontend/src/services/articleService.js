import api from "./api";

export const articleService = {
  // Get all articles with filtering and pagination
  async getArticles(params = {}) {
    try {
      const response = await api.get("/articles", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get articles by part (III, IV, IV-A)
  async getArticlesByPart(part) {
    try {
      const response = await api.get(`/articles/part/${part}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get single article by number
  async getArticleByNumber(articleNumber) {
    try {
      const response = await api.get(`/articles/${articleNumber}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Search articles
  async searchArticles(query, params = {}) {
    try {
      const response = await api.get(
        `/articles/search/${encodeURIComponent(query)}`,
        { params }
      );
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
        error: error.response.data?.error || "Server error",
        message: error.response.data?.message || "An error occurred",
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: "Network error",
        message:
          "Unable to connect to server. Please check your internet connection.",
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: "Unknown error",
        message: error.message || "An unexpected error occurred",
      };
    }
  },
};

export default articleService;
