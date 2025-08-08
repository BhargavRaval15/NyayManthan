import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import articleService from "../services/articleService";

const PartPage = () => {
  const { partNumber } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const partInfo = {
    III: {
      name: "Fundamental Rights",
      description:
        "The fundamental rights are the basic human rights of all citizens. These rights apply irrespective of race, place of birth, religion, caste, creed, color or sex. They are enforceable by the courts, subject to specific restrictions.",
      range: "Articles 12-35",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      textColor: "text-blue-600",
      badgeClass: "badge-part-iii",
      icon: "⚖️",
      keyFeatures: [
        "Right to Equality (Articles 14-18)",
        "Right to Freedom (Articles 19-22)",
        "Right against Exploitation (Articles 23-24)",
        "Right to Freedom of Religion (Articles 25-28)",
        "Cultural and Educational Rights (Articles 29-30)",
        "Right to Constitutional Remedies (Article 32)",
      ],
      importance:
        "Dr. B.R. Ambedkar called Article 32 (Right to Constitutional Remedies) the 'heart and soul' of the Constitution.",
    },
    IV: {
      name: "Directive Principles of State Policy",
      description: "Guidelines for the government to create a just society",
      range: "Articles 36-51",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      textColor: "text-green-600",
      badgeClass: "badge-part-iv",
      icon: "🏛️",
      keyFeatures: ["Social Security", "Economic Justice", "Political Justice"],
    },
    "IV-A": {
      name: "Fundamental Duties",
      description: "The fundamental duties of every Indian citizen",
      range: "Article 51A",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      textColor: "text-purple-600",
      badgeClass: "badge-part-iv-a",
      icon: "🤝",
      keyFeatures: [
        "Respect Constitution",
        "Protect Environment",
        "Promote Harmony",
      ],
    },
  };

  const currentPart = partInfo[partNumber];

  useEffect(() => {
    loadArticles();
  }, [partNumber]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.originalText
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await articleService.getArticlesByPart(partNumber);

      if (result.success) {
        setArticles(result.data);
      } else {
        setError(result.message || "Failed to load articles");
      }
    } catch (err) {
      setError(err.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  if (!currentPart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Invalid Part
          </h1>
          <p className="text-gray-600 mb-4">
            The requested part does not exist.
          </p>
          <Link to="/legal-atlas" className="btn-primary">
            Back to Legal Atlas
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className={`${currentPart.bgColor} ${currentPart.borderColor} border-b py-12`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/legal-atlas" className="hover:text-primary-600">
              Legal Atlas
            </Link>
            <span>/</span>
            <span className="text-gray-800">Part {partNumber}</span>
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                currentPart.textColor === "text-blue-600"
                  ? "bg-blue-600"
                  : currentPart.textColor === "text-green-600"
                  ? "bg-green-600"
                  : "bg-purple-600"
              }`}
            >
              <span className="text-3xl">{currentPart.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800">
                Part {partNumber}
              </h1>
              <h2 className="text-xl text-gray-600 mt-2">{currentPart.name}</h2>
              <p className="text-gray-500 mt-1">{currentPart.range}</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 max-w-4xl mb-6">
            {currentPart.description}
          </p>

          {/* Part III specific features */}
          {partNumber === "III" && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Categories
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPart.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border border-blue-100"
                  >
                    <span className="text-sm font-medium text-blue-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              {currentPart.importance && (
                <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-800 italic">
                    <strong>Did you know?</strong> {currentPart.importance}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Search and Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error ? (
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Error Loading Articles
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button onClick={loadArticles} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Articles Found
              </h2>
              <p className="text-gray-600 mb-4">
                No articles available for this part.
              </p>
              <Link to="/legal-atlas" className="btn-primary">
                Back to Legal Atlas
              </Link>
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Articles ({filteredArticles.length})
                  </h2>
                  <span className={`${currentPart.badgeClass}`}>
                    {currentPart.range}
                  </span>
                </div>

                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
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
                </div>
              </div>

              <div className="grid gap-6">
                {filteredArticles.map((article) => (
                  <div key={article.articleNumber} className="card-hover">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-lg font-bold text-gray-800">
                            Article {article.articleNumber}
                          </span>
                          <span className={`${currentPart.badgeClass}`}>
                            Part {partNumber}
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

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.originalText.substring(0, 200)}...
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                              {article.tags.slice(0, 2).join(", ")}
                              {article.tags.length > 2 && "..."}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to={`/article/${article.articleNumber}`}
                          className="btn-outline"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              to="/legal-atlas"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Legal Atlas
            </Link>

            <div className="text-sm text-gray-500">
              {articles.length} article{articles.length !== 1 ? "s" : ""} in
              Part {partNumber}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartPage;
