// components/NotFound.jsx - 404 Error Page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-sky-500 mb-4">404</div>
          <div className="w-32 h-32 bg-sky-100 rounded-full mx-auto flex items-center justify-center">
            <Search className="w-16 h-16 text-sky-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Looking for something?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/test-selection')}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Practice Tests
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Pricing
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;