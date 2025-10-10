import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import LegalAtlas from "./pages/LegalAtlas";
import PartPage from "./pages/PartPage";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/legal-atlas" element={<LegalAtlas />} />
            <Route path="/part/:partNumber" element={<PartPage />} />
            <Route path="/article/:articleNumber" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Simple 404 page component
const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-16 text-center bg-gray-50 dark:bg-gray-900">
    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
      404 - Page Not Found
    </h1>
    <p className="text-gray-600 dark:text-gray-300 mb-8">
      The page you're looking for doesn't exist.
    </p>
    <a href="/" className="btn-primary dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600">
      Go Back Home
    </a>
  </div>
);

export default App;
