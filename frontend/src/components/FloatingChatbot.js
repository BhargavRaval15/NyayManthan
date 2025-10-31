import React, { useState } from "react";
import { Link } from "react-router-dom";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/ai/navigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(
        data.data
          ? {
              articles: data.data.suggestedArticles,
              aiSummary: data.data.message,
            }
          : {}
      );
    } catch (err) {
      setError(err.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary-600 text-white rounded-full shadow-lg p-4 hover:bg-primary-700 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Chatbot"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 3h-6a2 2 0 00-2 2v4h10V5a2 2 0 00-2-2z"
          />
        </svg>
      </button>
      {/* Chatbot panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-primary-700 dark:text-primary-400">
              AI Legal Chatbot
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mb-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-2"
              rows={2}
              placeholder="Describe your problem..."
              disabled={loading}
            />
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading || !input.trim()}
            >
              {loading ? "Searching..." : "Ask AI"}
            </button>
          </form>
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded p-2 text-red-700 dark:text-red-200 mb-2">
              {error}
            </div>
          )}
          {results && (
            <div className="mt-2">
              <span className="font-semibold text-green-700 dark:text-green-300">
                Relevant Articles:
              </span>
              {results.articles && results.articles.length > 0 ? (
                <ul className="list-disc pl-5 mt-1">
                  {results.articles.map((art, idx) => (
                    <li key={idx} className="mb-1">
                      <Link
                        to={`/article/${art.articleNumber}`}
                        className="text-primary-600 dark:text-primary-400 underline font-bold"
                        onClick={() => setOpen(false)}
                      >
                        Article {art.articleNumber}: {art.title}
                      </Link>
                      <div className="text-gray-700 dark:text-gray-200 text-xs mt-1">
                        {art.explanation}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-700 dark:text-gray-200">
                  No relevant articles found.
                </div>
              )}
              {results.aiSummary && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded text-xs">
                  <strong>AI Summary:</strong> {results.aiSummary}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
