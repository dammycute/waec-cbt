// components/RegistrationPage.jsx - Mobile Registration Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    school: '',
    class: 'SS1',
    plan: 'free',
    agreedToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please agree to Terms & Privacy Policy');
      return;
    }

    // In production, send to backend
    // For now, navigate to dashboard
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 overflow-y-auto" style={{ maxWidth: '375px', margin: '0 auto' }}>
      {/* Header */}
      <header className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/login')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold ml-4">Create Account</h1>
      </header>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div>
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number (+234)" 
            value={formData.phone}
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

        <div className="relative">
          <input 
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div>
          <input 
            type="text"
            name="school"
            placeholder="School Name" 
            value={formData.school}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <select 
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="SS1">Class: SS1</option>
            <option value="SS2">Class: SS2</option>
            <option value="SS3">Class: SS3</option>
          </select>
        </div>

        {/* Plan Selection */}
        <div className="space-y-3 pt-2">
          <p className="text-sm font-semibold text-gray-700">Choose Plan:</p>
          
          <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer hover:border-sky-300 transition-colors">
            <input 
              type="radio" 
              name="plan" 
              value="free"
              checked={formData.plan === 'free'}
              onChange={handleChange}
              className="mt-1 mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">Free</p>
              <p className="text-sm text-gray-600">5 tests/month, basic analytics</p>
            </div>
          </label>

          <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer hover:border-sky-300 transition-colors">
            <input 
              type="radio" 
              name="plan" 
              value="premium"
              checked={formData.plan === 'premium'}
              onChange={handleChange}
              className="mt-1 mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">Premium - ₦2,500/month</p>
              <p className="text-sm text-gray-600">Unlimited tests, AI feedback, full analytics</p>
            </div>
          </label>
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-start text-sm">
          <input 
            type="checkbox" 
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 mr-2"
            required
          />
          <span className="text-gray-700">
            I agree to{' '}
            <a href="/terms" className="text-sky-600 hover:text-sky-700">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-sky-600 hover:text-sky-700">Privacy Policy</a>
          </span>
        </label>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pb-4">
        <p className="text-gray-700">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-sky-600 font-semibold hover:text-sky-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;