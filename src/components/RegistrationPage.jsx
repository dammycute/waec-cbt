import React, { useState } from 'react';
import { Eye, EyeOff, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { registerUser } from '../services/auth';

const RegistrationPage = () => {
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: '', error: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, text: '', color: 'bg-gray-200' };
    if (password.length < 6) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, text: 'Fair', color: 'bg-orange-500' };
    if (password.length < 12) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async () => {
    setStatus({ success: '', error: '' });
    if (formData.password !== formData.confirmPassword) {
      setStatus({ error: 'Passwords do not match!', success: '' });
      return;
    }
    if (!formData.agreedToTerms) {
      setStatus({ error: 'Please agree to Terms & Privacy Policy', success: '' });
      return;
    }
    setLoading(true);
    try {
      const sendData = { ...formData };
      delete sendData.confirmPassword;
      const res = await registerUser(sendData);
      if (res) {
        window.location.href = '/login';
      }
      setStatus({ success: 'Account created successfully!', error: '' });
      setFormData({
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
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">WAEC CBT Practice</h1>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Registration Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">1</span>
                    </div>
                    <span className="text-gray-900 font-medium">Personal Info</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-semibold">2</span>
                    </div>
                    <span className="text-gray-500">School Details</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-semibold">3</span>
                    </div>
                    <span className="text-gray-500">Choose Plan</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">What You'll Get</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Unlimited practice tests</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">AI-powered feedback</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Detailed analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Real CBT experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Registration Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Join thousands of students preparing for WAEC</p>
              </div>
              <div className="space-y-6">
                {status.error && <div className="text-red-600 text-sm mb-2">{status.error}</div>}
                {status.success && <div className="text-green-600 text-sm mb-2">{status.success}</div>}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
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
                          placeholder="Create a password"
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
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Password strength:</span>
                            <span className={`text-xs font-medium ${
                              passwordStrength.strength >= 75 ? 'text-green-600' :
                              passwordStrength.strength >= 50 ? 'text-blue-600' :
                              passwordStrength.strength >= 25 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {passwordStrength.text}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">School Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School Name
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="Enter your school name"
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class
                      </label>
                      <select
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      >
                        <option value="SS1">SS1</option>
                        <option value="SS2">SS2</option>
                        <option value="SS3">SS3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all ${
                      formData.plan === 'free' 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-300 hover:border-sky-300'
                    }`}>
                      <input
                        type="radio"
                        name="plan"
                        value="free"
                        checked={formData.plan === 'free'}
                        onChange={handleChange}
                        className="absolute top-4 right-4"
                      />
                      <div className="mb-3">
                        <h4 className="text-lg font-bold text-gray-900">Free Plan</h4>
                        <p className="text-2xl font-bold text-gray-900 mt-1">₦0<span className="text-sm font-normal text-gray-600">/month</span></p>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          5 tests per month
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Basic performance tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Mobile & desktop access
                        </li>
                      </ul>
                    </label>
                    <label className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all ${
                      formData.plan === 'premium' 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-300 hover:border-sky-300'
                    }`}>
                      <div className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        RECOMMENDED
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        value="premium"
                        checked={formData.plan === 'premium'}
                        onChange={handleChange}
                        className="absolute top-4 right-4"
                      />
                      <div className="mb-3">
                        <h4 className="text-lg font-bold text-gray-900">Premium Plan</h4>
                        <p className="text-2xl font-bold text-gray-900 mt-1">₦2,500<span className="text-sm font-normal text-gray-600">/month</span></p>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Unlimited practice tests
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          AI-powered feedback
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Full analytics & insights
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Priority support
                        </li>
                      </ul>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <button type="button" className="text-sky-600 hover:text-sky-700 font-medium">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-sky-600 hover:text-sky-700 font-medium">
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <button type="button" className="text-sky-600 font-semibold hover:text-sky-700">
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
