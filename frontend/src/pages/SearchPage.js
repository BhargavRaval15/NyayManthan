import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import articleService from "../services/articleService";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      const result = await articleService.searchArticles(searchQuery);

      if (result.success) {
        setResults(result.data);
      } else {
        setError(result.message || "Search failed");
        setResults([]);
      }
    } catch (err) {
      setError(err.message || "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      handleSearch();
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-heading font-bold text-gray-800 dark:text-white text-center mb-6">
              Search Articles
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
              Find constitutional articles using keywords, topics, or legal
              concepts
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for articles... (e.g., 'freedom of speech', 'equality', 'fundamental rights')"
                  className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-16"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Searching articles...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Search Error
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => handleSearch()}
                className="btn-primary dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
              >
                Try Again
              </button>
            </div>
          )}

          {hasSearched && !loading && !error && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Search Results
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {results.length > 0
                    ? `Found ${results.length} article${
                        results.length !== 1 ? "s" : ""
                      } for "${query}"`
                    : `No articles found for "${query}"`}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid gap-6">
                  {results.map((article) => (
                    <div
                      key={article.articleNumber}
                      className="card-hover dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-lg font-bold text-gray-800 dark:text-white">
                              Article {article.articleNumber}
                            </span>
                            <span
                              className={`${getPartBadgeClass(article.part)}`}
                            >
                              Part {article.part}
                            </span>
                            {article.simplifiedText && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg
                                  className="w-3 h-3 mr-1"
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
                                AI Simplified
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {article.originalText.substring(0, 300)}...
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {article.viewCount || 0} views
                            </span>

                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                              </svg>
                              {article.partName}
                            </span>

                            {article.tags && article.tags.length > 0 && (
                              <span className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                                {article.tags.slice(0, 3).join(", ")}
                                {article.tags.length > 3 && "..."}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="ml-4 flex-shrink-0">
                          <Link
                            to={`/article/${article.articleNumber}`}
                            className="btn-outline dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                          >
                            Read Article
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 dark:bg-gray-900">
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We couldn't find any articles matching your search. Try
                    different keywords or browse by parts.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/legal-atlas"
                      className="btn-primary dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
                    >
                      Browse Legal Atlas
                    </Link>
                    <button
                      onClick={() => setQuery("")}
                      className="btn-outline dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Search Suggestions */}
          {!hasSearched && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Popular Search Terms
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                    Rights & Freedoms
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setQuery("freedom of speech");
                        handleSearch("freedom of speech");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Freedom of Speech
                    </button>
                    <button
                      onClick={() => {
                        setQuery("right to life");
                        handleSearch("right to life");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Right to Life
                    </button>
                    <button
                      onClick={() => {
                        setQuery("equality");
                        handleSearch("equality");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Equality
                    </button>
                  </div>
                </div>

                <div className="card dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                    Legal Concepts
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setQuery("fundamental rights");
                        handleSearch("fundamental rights");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Fundamental Rights
                    </button>
                    <button
                      onClick={() => {
                        setQuery("directive principles");
                        handleSearch("directive principles");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Directive Principles
                    </button>
                    <button
                      onClick={() => {
                        setQuery("fundamental duties");
                        handleSearch("fundamental duties");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Fundamental Duties
                    </button>
                  </div>
                </div>

                <div className="card dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                    Social Issues
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setQuery("discrimination");
                        handleSearch("discrimination");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Discrimination
                    </button>
                    <button
                      onClick={() => {
                        setQuery("education");
                        handleSearch("education");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Education
                    </button>
                    <button
                      onClick={() => {
                        setQuery("environment");
                        handleSearch("environment");
                      }}
                      className="block text-left text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
                    >
                      Environment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
