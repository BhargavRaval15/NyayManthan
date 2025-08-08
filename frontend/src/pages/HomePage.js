import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg constitution-pattern py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-800 mb-6">
            <span className="text-primary-600">न्याय</span>मंथन
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn the <strong>Indian Constitution</strong> in a simpler manner
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            AI-powered platform to understand your fundamental rights, directive
            principles, and fundamental duties without legal jargon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/legal-atlas" className="btn-primary text-lg px-8 py-3">
              Explore Legal Atlas
            </Link>
            <Link to="/about" className="btn-outline text-lg px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Constitution Parts Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            Explore Constitutional Parts
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Part III */}
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">III</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fundamental Rights</h3>
              <p className="text-gray-600 mb-4">
                Your basic rights as a citizen - from freedom of speech to right
                to life.
              </p>
              <span className="text-sm text-gray-500 mb-4 block">
                Articles 12-35
              </span>
              <Link to="/part/III" className="btn-primary">
                Explore Part III
              </Link>
            </div>

            {/* Part IV */}
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">IV</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Directive Principles</h3>
              <p className="text-gray-600 mb-4">
                Guidelines for the government to create a just society.
              </p>
              <span className="text-sm text-gray-500 mb-4 block">
                Articles 36-51
              </span>
              <Link to="/part/IV" className="btn-primary">
                Explore Part IV
              </Link>
            </div>

            {/* Part IV-A */}
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">IV-A</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fundamental Duties</h3>
              <p className="text-gray-600 mb-4">
                Your responsibilities as a citizen of India.
              </p>
              <span className="text-sm text-gray-500 mb-4 block">
                Article 51A
              </span>
              <Link to="/part/IV-A" className="btn-primary">
                Explore Part IV-A
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            Why Choose NyayManthan?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Simplification */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
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
              </div>
              <h3 className="text-lg font-bold mb-3">
                AI-Powered Simplification
              </h3>
              <p className="text-gray-600">
                Complex legal language simplified using advanced AI to help you
                understand your rights.
              </p>
            </div>

            {/* Easy Navigation */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-secondary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">Easy Navigation</h3>
              <p className="text-gray-600">
                Intuitive interface to browse through constitutional articles
                and parts.
              </p>
            </div>

            {/* Real Examples */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">Real-World Examples</h3>
              <p className="text-gray-600">
                Understand how constitutional articles apply to everyday
                situations.
              </p>
            </div>

            {/* Case Studies */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
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
              </div>
              <h3 className="text-lg font-bold mb-3">Case Studies</h3>
              <p className="text-gray-600">
                Learn from important legal cases that shaped constitutional
                interpretation.
              </p>
            </div>

            {/* Search */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
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
              <h3 className="text-lg font-bold mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Find relevant articles using natural language search powered by
                AI.
              </p>
            </div>

            {/* Mobile Friendly */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">
                Access constitutional knowledge anytime, anywhere on any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are learning about their
            constitutional rights and duties.
          </p>
          <Link to="/legal-atlas" className="btn-secondary text-lg px-8 py-3">
            Begin Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
