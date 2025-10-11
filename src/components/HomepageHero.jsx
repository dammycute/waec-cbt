// components/HomepageHero.jsx - Landing Page Hero Section
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomepageHero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">WAEC CBT Practice</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/pricing')}
                className="text-gray-600 hover:text-gray-800"
              >
                Pricing
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-800"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center min-h-[600px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Ace Your WAEC Exams with AI-Powered Practice
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Practice in real CBT environment. Get instant feedback. Improve your scores.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => navigate('/register')}
              className="bg-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow-lg"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className="border-2 border-sky-500 text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
            >
              For Schools
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-sky-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-white"></div>
            </div>
            <span className="text-sm">Join 5,000+ students improving their scores</span>
          </div>
        </div>

        {/* Right Side - Image/Illustration */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700">Mathematics</span>
                <span className="text-lg font-bold text-sky-600">45:23</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                <div className="h-12 bg-sky-100 border-2 border-sky-500 rounded-lg"></div>
                <div className="h-12 bg-gray-50 border border-gray-300 rounded-lg"></div>
                <div className="h-12 bg-gray-50 border border-gray-300 rounded-lg"></div>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="px-4 py-2 bg-gray-100 rounded text-sm">Previous</div>
                <div className="px-4 py-2 bg-sky-500 text-white rounded text-sm">Next</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose WAEC CBT Practice?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real CBT Environment</h3>
              <p className="text-gray-600">Practice in the exact format you'll see on exam day</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Feedback</h3>
              <p className="text-gray-600">Get instant explanations and personalized study plans</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">See your improvement with detailed analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;