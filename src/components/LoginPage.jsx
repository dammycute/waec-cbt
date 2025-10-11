// components/LoginPage.jsx - Mobile Login Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, validate credentials here
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4" style={{ maxWidth: '375px', margin: '0 auto' }}>
      {/* Logo & Header */}
      <div className="w-full text-center mb-8">
        <div className="w-16 h-16 bg-sky-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">WAEC CBT Practice</h1>
        <p className="text-gray-600">Practice smarter, score higher</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <input 
            type="text" 
            name="emailOrPhone"
            placeholder="Email or Phone" 
            value={formData.emailOrPhone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-right">
          <a href="/forgot-password" className="text-sm text-sky-600 hover:text-sky-700">
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          Login
        </button>
      </form>

      <div className="my-4 text-gray-500">or</div>

      <div className="text-center space-y-3">
        <p className="text-gray-700">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/register')}
            className="text-sky-600 font-semibold hover:text-sky-700"
          >
            Sign Up
          </button>
        </p>
        <button 
          onClick={() => navigate('/admin-dashboard')}
          className="text-gray-600 hover:text-gray-800"
        >
          For Schools →
        </button>
      </div>
    </div>
  );
};

export default LoginPage;