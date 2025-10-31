import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen, Users, Award } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    alert('Login successful! (Demo)');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          
          {/* Left Side - Hero Section */}
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-12 text-white flex flex-col justify-between min-h-[600px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-sky-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">WAEC CBT Practice</h1>
                </div>
              </div>
              <p className="text-xl text-sky-100 mb-8">Practice smarter, score higher</p>
              
              <div className="mb-8 bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white bg-opacity-20 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-white bg-opacity-20 rounded w-2/3 mx-auto"></div>
                    <div className="h-4 bg-white bg-opacity-20 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <Users className="w-5 h-5" />
                <span className="font-medium">Join 5,000+ students</span>
              </div>
              <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span className="font-medium">Trusted by 50+ schools</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue your WAEC preparation</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email or phone"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Login
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-sky-600 font-semibold hover:text-sky-700"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="text-sky-600 font-medium hover:text-sky-700 inline-flex items-center gap-2"
                  >
                    For Schools →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;