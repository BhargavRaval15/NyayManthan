import React from "react";
import { Link } from "react-router-dom";

const LegalAtlas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-4">
              Legal Atlas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate through the Indian Constitution with ease. Explore
              fundamental rights, directive principles, and fundamental duties
              in a structured manner.
            </p>
          </div>
        </div>
      </section>

      {/* Constitution Parts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {/* Part III - Fundamental Rights */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-blue-50 px-8 py-6 border-b border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">III</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Part III
                    </h2>
                    <p className="text-blue-600 font-medium">
                      Fundamental Rights
                    </p>
                    <p className="text-gray-600 text-sm">Articles 12-35</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  The fundamental rights guaranteed to every Indian citizen,
                  including the right to equality, freedom of speech, right to
                  life, and protection from discrimination.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Key Rights Include:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Right to Equality (Articles 14-18)</li>
                      <li>• Right to Freedom (Articles 19-22)</li>
                      <li>• Right against Exploitation (Articles 23-24)</li>
                      <li>• Right to Freedom of Religion (Articles 25-28)</li>
                      <li>
                        • Cultural and Educational Rights (Articles 29-30)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Popular Articles:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Article 14: Equality before Law</li>
                      <li>• Article 19: Freedom of Speech</li>
                      <li>• Article 21: Right to Life</li>
                      <li>• Article 25: Freedom of Religion</li>
                    </ul>
                  </div>
                </div>

                <Link to="/part/III" className="btn-primary">
                  Explore Fundamental Rights
                </Link>
              </div>
            </div>

            {/* Part IV - Directive Principles */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-green-50 px-8 py-6 border-b border-green-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">IV</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Part IV
                    </h2>
                    <p className="text-green-600 font-medium">
                      Directive Principles of State Policy
                    </p>
                    <p className="text-gray-600 text-sm">Articles 36-51</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  Guidelines for the government to create a just society. These
                  principles, while not legally enforceable, are fundamental to
                  governance and law-making.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Key Principles:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Adequate means of livelihood for all</li>
                      <li>• Equal pay for equal work</li>
                      <li>• Protection of children and workers</li>
                      <li>• Promotion of educational and economic interests</li>
                      <li>• Uniform civil code</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Important Articles:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Article 39: Livelihood and Distribution</li>
                      <li>• Article 44: Uniform Civil Code</li>
                      <li>• Article 45: Early Childhood Care</li>
                      <li>• Article 48: Environment Protection</li>
                    </ul>
                  </div>
                </div>

                <Link to="/part/IV" className="btn-primary">
                  Explore Directive Principles
                </Link>
              </div>
            </div>

            {/* Part IV-A - Fundamental Duties */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-purple-50 px-8 py-6 border-b border-purple-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">IV-A</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Part IV-A
                    </h2>
                    <p className="text-purple-600 font-medium">
                      Fundamental Duties
                    </p>
                    <p className="text-gray-600 text-sm">Article 51A</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  The fundamental duties of every Indian citizen, added to the
                  Constitution in 1976. These duties complement the fundamental
                  rights and promote national unity.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Key Duties:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Respect the Constitution and national symbols</li>
                      <li>• Protect sovereignty and integrity of India</li>
                      <li>• Promote harmony and brotherhood</li>
                      <li>• Preserve rich heritage and culture</li>
                      <li>• Protect environment and wildlife</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Additional Duties:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Develop scientific temper</li>
                      <li>• Safeguard public property</li>
                      <li>• Strive for excellence</li>
                      <li>• Provide education to children (6-14 years)</li>
                    </ul>
                  </div>
                </div>

                <Link to="/part/IV-A" className="btn-primary">
                  Explore Fundamental Duties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Looking for Something Specific?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our search feature to find articles related to your interests or
            legal questions.
          </p>
          <Link to="/search" className="btn-secondary">
            Search Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalAtlas;
