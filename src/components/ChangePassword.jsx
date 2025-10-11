// components/ChangePassword.jsx - Change Password Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate password strength for new password
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return { text: '', color: '' };
    if (passwordStrength <= 2) return { text: 'Weak', color: 'text-red-600' };
    if (passwordStrength <= 3) return { text: 'Medium', color: 'text-orange-600' };
    if (passwordStrength <= 4) return { text: 'Strong', color: 'text-green-600' };
    return { text: 'Very Strong', color: 'text-green-700' };
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-orange-500';
    if (passwordStrength <= 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.newPassword.length >= 8 },
    { text: 'Contains uppercase and lowercase', met: /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) },
    { text: 'Contains a number', met: /[0-9]/.test(formData.newPassword) },
    { text: 'Contains a special character', met: /[^a-zA-Z0-9]/.test(formData.newPassword) }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      alert('New password must be different from current password!');
      return;
    }

    // In production, send to backend
    alert('Password changed successfully!');
    navigate('/profile');
  };

  const strengthInfo = getPasswordStrengthText();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Change Password</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Security Tip</p>
              <p className="text-sm text-blue-800">
                Choose a strong password that you don't use for other accounts. 
                Consider using a password manager for better security.
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                minLength="8"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Password Strength:</span>
                  <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                    {strengthInfo.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-4 space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {req.met ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={req.met ? 'text-green-700' : 'text-gray-600'}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                minLength="8"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <X className="w-4 h-4" />
                Passwords do not match
              </p>
            )}
            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
              <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Passwords match
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Change Password
          </button>
        </form>

        {/* Last Changed Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Last password change:</span> 30 days ago
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For security reasons, we recommend changing your password every 90 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;