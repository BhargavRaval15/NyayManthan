// App Constants
export const APP_NAME = "NyayManthan";
export const APP_TAGLINE = "Learn Constitution Simply";
export const APP_VERSION = "1.0.0";

// API Configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const API_TIMEOUT = 30000;

// Constitutional Parts
export const CONSTITUTION_PARTS = {
  III: {
    name: "Fundamental Rights",
    description: "The fundamental rights guaranteed to every Indian citizen",
    articles: "12-35",
    color: "blue",
    icon: "⚖️",
  },
  IV: {
    name: "Directive Principles of State Policy",
    description: "Guidelines for the government to create a just society",
    articles: "36-51",
    color: "green",
    icon: "🏛️",
  },
  "IV-A": {
    name: "Fundamental Duties",
    description: "The fundamental duties of every Indian citizen",
    articles: "51A",
    color: "purple",
    icon: "🤝",
  },
};

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_RESULTS: 20,
  DEBOUNCE_DELAY: 300,
};

// UI Configuration
export const UI_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  MAX_CONTENT_WIDTH: 1200,
  PAGINATION_SIZE: 10,
};

// Feature Flags
export const FEATURES = {
  AI_SIMPLIFICATION: process.env.REACT_APP_ENABLE_AI_FEATURES !== "false",
  SEARCH: process.env.REACT_APP_ENABLE_SEARCH !== "false",
  GAMIFICATION: process.env.REACT_APP_ENABLE_GAMIFICATION === "true",
  ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === "true",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  AI_SERVICE_ERROR:
    "AI service is temporarily unavailable. Please try again later.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ARTICLE_LOADED: "Article loaded successfully",
  SEARCH_COMPLETED: "Search completed successfully",
  SIMPLIFICATION_GENERATED: "AI simplification generated successfully",
};

// Loading States
export const LOADING_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  IDLE: "idle",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "nyaymanthan_theme",
  LANGUAGE: "nyaymanthan_language",
  SEARCH_HISTORY: "nyaymanthan_search_history",
  USER_PREFERENCES: "nyaymanthan_user_preferences",
};

// Development Phase Information
export const DEVELOPMENT_PHASES = {
  PHASE_1: {
    name: "Core MVP",
    status: "current",
    features: [
      "Article browsing",
      "AI simplification",
      "Basic search",
      "Responsive design",
    ],
  },
  PHASE_2: {
    name: "AI Navigator",
    status: "planned",
    features: [
      "Natural language search",
      "AI recommendations",
      "Semantic search",
      "Enhanced UX",
    ],
  },
  PHASE_3: {
    name: "Legal Arena",
    status: "planned",
    features: [
      "Constitutional quizzes",
      "Leaderboards",
      "Interactive games",
      "Progress tracking",
    ],
  },
  PHASE_4: {
    name: "Legal Advice & Updates",
    status: "planned",
    features: [
      "AI legal assistant",
      "Amendment tracking",
      "News integration",
      "Case law references",
    ],
  },
  PHASE_5: {
    name: "Materials & Polish",
    status: "planned",
    features: [
      "Reading materials",
      "UI/UX improvements",
      "Performance optimization",
      "Accessibility",
    ],
  },
};

export default {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  API_BASE_URL,
  API_TIMEOUT,
  CONSTITUTION_PARTS,
  SEARCH_CONFIG,
  UI_CONFIG,
  FEATURES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_STATES,
  STORAGE_KEYS,
  DEVELOPMENT_PHASES,
};
