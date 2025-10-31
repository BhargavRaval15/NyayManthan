import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className={
        "shadow-lg border-b " +
        (darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.jpg"}
              alt="NyayManthan Logo"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-600 shadow-lg"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-gray-800 dark:text-white">
                NyayManthan
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                Learn Constitution Simply
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              className="btn-outline px-3 py-1 rounded-full text-xs"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
            <Link
              to="/"
              className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/legal-atlas"
              className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Legal Atlas
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              About
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-600 text-white font-semibold focus:outline-none"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                    />
                  </svg>
                  <span>Profile</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                      onClick={() => {
                        localStorage.removeItem("isAuthenticated");
                        setIsMenuOpen(false);
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                className="w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
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
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/legal-atlas"
                className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Legal Atlas
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
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
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
