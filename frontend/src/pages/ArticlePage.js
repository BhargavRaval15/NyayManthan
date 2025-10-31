import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import articleService from "../services/articleService";
import aiService from "../services/aiService";

const ArticlePage = () => {
  const { articleNumber } = useParams();
  const [article, setArticle] = useState(null);
  const [simplifiedText, setSimplifiedText] = useState(null);
  // Podcast state
  // AI Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [chatResults, setChatResults] = useState(null);
  // Handler for AI chat mapping
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatError(null);
    setChatResults(null);
    try {
      // Example API endpoint: /api/map-problem-to-articles
      const res = await fetch("/api/map-problem-to-articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: chatInput,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setChatResults(data);
    } catch (err) {
      setChatError(err.message || "Failed to map problem to articles");
    } finally {
      setChatLoading(false);
    }
  };
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [podcastScript, setPodcastScript] = useState(null);
  const [podcastAudio, setPodcastAudio] = useState(null);
  const [podcastError, setPodcastError] = useState(null);
  const [playing, setPlaying] = useState({
    narrator: false,
    host: false,
    guest: false,
  });
  const audioRef = React.createRef();

  // Language selection
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "gu", label: "Gujarati" },
  ];
  // Podcast generation handler
  const handleGeneratePodcast = async () => {
    setPodcastLoading(true);
    setPodcastError(null);
    setPodcastScript(null);
    setPodcastAudio(null);
    try {
      const res = await fetch("/api/generate-podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: article.originalText,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPodcastScript(data.script);
      setPodcastAudio(data.audio);
    } catch (err) {
      setPodcastError(err.message || "Failed to generate podcast");
    } finally {
      setPodcastLoading(false);
    }
  };

  // Play audio for a speaker
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };
  const [loading, setLoading] = useState(true);
  const [simplifying, setSimplifying] = useState(false);
  const [error, setError] = useState(null);

  const loadArticle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await articleService.getArticleByNumber(articleNumber);

      if (result.success) {
        setArticle(result.data);
        // DON'T auto-load simplified text - only show when user clicks button
        setSimplifiedText(null);
      } else {
        setError(result.message || "Failed to load article");
      }
    } catch (err) {
      setError(err.message || "Failed to load article");
    } finally {
      setLoading(false);
    }
  }, [articleNumber]);

  useEffect(() => {
    // Reset simplified text when navigating to different article
    setSimplifiedText(null);
    setError(null);
    loadArticle();
  }, [articleNumber, loadArticle]);

  const handleSimplify = async () => {
    if (!article) return;
    try {
      setSimplifying(true);
      setError(null);
      const result = await aiService.simplifyArticle(
        article.articleNumber,
        selectedLanguage
      );
      if (result.success) {
        setSimplifiedText(result.data.simplifiedText);
        setArticle((prev) => ({
          ...prev,
          simplifiedText: result.data.simplifiedText,
          lastSimplified: new Date(),
        }));
      } else {
        setError(result.message || "Failed to simplify article");
        if (result.fallback) {
          setSimplifiedText(result.fallback);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to simplify article");
    } finally {
      setSimplifying(false);
    }
  };

  const getPartBadgeClass = (part) => {
    switch (part) {
      case "III":
        return "badge-part-iii";
      case "IV":
        return "badge-part-iv";
      case "IV-A":
        return "badge-part-iv-a";
      default:
        return "badge-part";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error && !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <Link
            to="/legal-atlas"
            className="btn-primary dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
          >
            Back to Legal Atlas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/legal-atlas" className="hover:text-primary-600">
              Legal Atlas
            </Link>
            <span>/</span>
            <Link
              to={`/part/${article.part}`}
              className="hover:text-primary-600"
            >
              Part {article.part}
            </Link>
            <span>/</span>
            <span className="text-gray-800">
              Article {article.articleNumber}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`${getPartBadgeClass(article.part)}`}>
                  Part {article.part}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {article.partName}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
                Article {article.articleNumber}
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                {article.title}
              </h2>
            </div>

            <div className="flex space-x-3 items-center">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border rounded px-2 py-1 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                style={{ minWidth: "120px" }}
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSimplify}
                disabled={simplifying}
                className="btn-primary flex items-center space-x-2"
              >
                {simplifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Simplifying...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>AI Simplify</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Original Text */}
              <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Original Text
                </h3>
                <div className="text-legal bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-gray-400 dark:border-gray-600">
                  {article.originalText}
                </div>
              </div>

              {/* Simplified Text */}
              {simplifiedText && (
                <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 text-primary-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    AI Simplified Explanation
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-primary-50 dark:bg-gray-900 p-6 rounded-lg border-l-4 border-primary-400 dark:border-primary-700">
                      <div className="markdown-content">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-2xl font-bold text-primary-700 mb-4 border-b-2 border-primary-200 pb-2">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-gray-700 mb-4 leading-relaxed">
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <span className="font-bold text-gray-900">
                                {children}
                              </span>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-none space-y-2 mb-4">
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-1">
                                  •
                                </span>
                                <span className="text-gray-700">
                                  {children}
                                </span>
                              </li>
                            ),
                            hr: () => <hr className="my-6 border-gray-300" />,
                            code: ({ children }) => (
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {simplifiedText}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* AI Disclaimer */}
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>AI Disclaimer:</strong> This simplified
                      explanation is generated by AI and may not capture all
                      legal nuances. For official interpretations, please
                      consult legal experts or refer to authoritative sources.
                    </p>
                  </div>
                </div>
              )}

              {/* Podcast Feature */}

              <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6h13M5 6v13h13"
                    />
                  </svg>
                  AI Story Generator
                </h3>
                <div className="flex space-x-3 items-center mb-4">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    style={{ minWidth: "120px" }}
                  >
                    {languageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleGeneratePodcast}
                    disabled={podcastLoading}
                    className="btn-primary"
                  >
                    {podcastLoading
                      ? "Generating Story..."
                      : "Listen Story / Podcast"}
                  </button>
                </div>
                {podcastError && (
                  <div className="text-red-600 mb-2">{podcastError}</div>
                )}
                {podcastScript && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Story</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm whitespace-pre-wrap">
                      {podcastScript}
                    </pre>
                  </div>
                )}
                {podcastAudio ? (
                  <div>
                    <h4 className="font-semibold mb-2">Audio</h4>
                    {/* Native browser controls */}
                    <audio
                      ref={audioRef}
                      src={`data:audio/mpeg;base64,${podcastAudio}`}
                      controls
                      style={{ width: "100%", marginBottom: "8px" }}
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      tabIndex={0}
                    />
                    {/* Custom play/pause button, more prominent */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <button
                        className="btn-secondary text-lg px-6 py-2"
                        onClick={playing ? handlePause : handlePlay}
                        style={{ minWidth: "100px", fontWeight: "bold" }}
                      >
                        {playing ? "Pause" : "Play"}
                      </button>
                      <span className="text-gray-500 text-sm">
                        (Tip: Click audio and press Space to play/pause)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mt-2">
                    <span className="text-red-700 dark:text-red-200 font-semibold">
                      Audio could not be generated for this story. Please try
                      again or check your backend settings.
                    </span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 dark:text-red-200 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-red-700 dark:text-red-200">
                        {error}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              {!simplifiedText && !simplifying && (
                <div className="card text-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Need a Simpler Explanation?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Click the "AI Simplify" button to get an easy-to-understand
                    explanation of this article.
                  </p>
                  <button
                    onClick={handleSimplify}
                    className="btn-primary dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
                  >
                    Get AI Simplification
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Article Info */}
              <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Article Info
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Article Number:
                    </span>
                    <p className="font-medium">{article.articleNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Part:
                    </span>
                    <p className="font-medium">
                      {article.part} - {article.partName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Views:
                    </span>
                    <p className="font-medium">{article.viewCount || 0}</p>
                  </div>
                  {article.lastSimplified && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Last Simplified:
                      </span>
                      <p className="font-medium text-sm">
                        {new Date(article.lastSimplified).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="card dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Navigation
                </h3>
                <div className="space-y-2">
                  <Link
                    to={`/part/${article.part}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
                  >
                     Back to Part {article.part}
                  </Link>
                  <Link
                    to="/legal-atlas"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
                  >
                     Back to Legal Atlas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
