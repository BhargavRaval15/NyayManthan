import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.jpg"}
                alt="NyayManthan Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-600 shadow-lg"
              />
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  NyayManthan
                </h3>
                <p className="text-gray-400 dark:text-gray-300 text-sm">
                  Learn Constitution Simply
                </p>
              </div>
            </div>
            <p className="text-gray-300 dark:text-gray-200 mb-4 max-w-md">
              Making the Indian Constitution accessible to every citizen through
              AI-powered simplification and modern technology. Understanding
              your rights and duties has never been easier.
            </p>
            <div className="text-sm text-gray-400 dark:text-gray-300">
              <p className="mb-2">
                <strong>Disclaimer:</strong> This platform uses AI to simplify
                constitutional articles. While we strive for accuracy, please
                consult legal experts for official interpretations.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 dark:text-gray-200 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-atlas"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Legal Atlas
                </Link>
              </li>
              <li>
                <Link
                  to="/part/III"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fundamental Rights
                </Link>
              </li>
              <li>
                <Link
                  to="/part/IV"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Directive Principles
                </Link>
              </li>
              <li>
                <Link
                  to="/part/IV-A"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fundamental Duties
                </Link>
              </li>
            </ul>
          </div>

          {/* Constitutional Parts */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Constitution Parts
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 dark:text-gray-200">
                  Part III
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm block">
                  Articles 12-35
                </span>
              </li>
              <li>
                <span className="text-gray-300 dark:text-gray-200">
                  Part IV
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm block">
                  Articles 36-51
                </span>
              </li>
              <li>
                <span className="text-gray-300 dark:text-gray-200">
                  Part IV-A
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm block">
                  Article 51A
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 dark:text-gray-300 text-sm mb-4 md:mb-0">
            <p>© 2025 NyayManthan. Built for educational purposes.</p>
            <p className="mt-1">
              Constitution of India © Government of India. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6 text-sm">
            <Link
              to="/about"
              className="text-gray-400 dark:text-gray-200 hover:text-white transition-colors"
            >
              About
            </Link>
            <a
              href="#"
              className="text-gray-400 dark:text-gray-200 hover:text-white transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-gray-200 hover:text-white transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
