import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
  <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 dark:text-white mb-6">
              About NyayManthan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Making the Indian Constitution accessible to every citizen through
              AI-powered simplification
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
  <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The Indian Constitution is the supreme law of our nation, but
                  its complex legal language often makes it difficult for
                  ordinary citizens to understand their rights and duties.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  NyayManthan bridges this gap by using advanced AI technology
                  to simplify constitutional articles, making them accessible to
                  everyone regardless of their legal background.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe that every citizen has the right to understand
                  their fundamental rights, directive principles, and
                  fundamental duties in simple, clear language.
                </p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">न्</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    Citizen-Centric Approach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Designed for citizens, by citizens, to democratize
                    constitutional knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
  <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
              What Makes NyayManthan Special?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  AI-Powered Simplification
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced AI technology converts complex legal language into
                  easy-to-understand explanations.
                </p>
              </div>

              <div className="text-center dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  Structured Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Organized content structure helps you navigate through
                  different parts of the Constitution systematically.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Smart Search
                </h3>
                <p className="text-gray-600">
                  Find relevant articles using natural language queries - no
                  need to know article numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Development Roadmap
            </h2>

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Phase 1: Core MVP (Current)
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Basic platform with article display and AI-powered
                    simplification for Parts III, IV, and IV-A.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Article browsing by constitutional parts</li>
                    <li>• AI simplification using ChatGPT API</li>
                    <li>• Basic search functionality</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Phase 2: AI Navigator
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Advanced AI-powered navigation and semantic search
                    capabilities.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Natural language article search</li>
                    <li>• AI-powered article recommendations</li>
                    <li>• Semantic search integration</li>
                    <li>• Enhanced user experience</li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Phase 3: Legal Arena (Optional)
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Gamification features to make constitutional learning
                    engaging.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Constitutional quizzes and MCQs</li>
                    <li>• Leaderboards and achievements</li>
                    <li>• Interactive learning games</li>
                    <li>• Progress tracking</li>
                  </ul>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Phase 4: Legal Advice & Updates
                  </h3>
                  <p className="text-gray-600 mb-2">
                    AI legal assistant and real-time constitutional updates.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• AI-powered legal query assistant</li>
                    <li>• Constitutional amendments tracking</li>
                    <li>• News and updates integration</li>
                    <li>• Case law references</li>
                  </ul>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Phase 5: Materials & Polish
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Comprehensive resources and final platform optimization.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Curated reading materials and books</li>
                    <li>• Enhanced UI/UX design</li>
                    <li>• Performance optimization</li>
                    <li>• Accessibility improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
  <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Technology Stack
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• React.js for user interface</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• React Router for navigation</li>
                  <li>• Axios for API communication</li>
                  <li>• Responsive design principles</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Backend
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Node.js with Express.js</li>
                  <li>• MongoDB for database</li>
                  <li>• OpenAI ChatGPT API</li>
                  <li>• JWT authentication (future)</li>
                  <li>• RESTful API design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-yellow-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-yellow-600"
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
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Important Disclaimer
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This platform uses AI to simplify constitutional articles
                    for educational purposes. While we strive for accuracy, the
                    simplified explanations may not capture all legal nuances.
                  </p>
                  <p className="text-gray-600">
                    For official legal interpretations, authoritative sources,
                    or legal advice, please consult qualified legal
                    professionals or refer to the original Constitution text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn About Your Rights?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start exploring the Indian Constitution today and understand your
            fundamental rights and duties.
          </p>
          <Link to="/legal-atlas" className="btn-secondary text-lg px-8 py-3">
            Start Learning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
