// components/ForgotPassword.jsx - Password Reset Flow
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Check } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // In production, send reset code to email
    alert(`Reset code sent to ${email}`);
    setStep(2);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      // In production, verify code
      setStep(3);
    } else {
      alert('Please enter the complete 6-digit code');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    // In production, update password
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ maxWidth: '375px', margin: '0 auto' }}>
      {/* Header */}
      <header className="p-4">
        <button 
          onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      <div className="flex-1 px-6 py-8">
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
            <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Forgot Password?</h1>
            <p className="text-gray-600 text-center mb-8">
              Enter your email and we'll send you a code to reset your password
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                Send Reset Code
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Remember your password?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-sky-600 font-semibold hover:text-sky-700"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {/* Step 2: Enter Code */}
        {step === 2 && (
          <div>
            <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Enter Code</h1>
            <p className="text-gray-600 text-center mb-8">
              We sent a 6-digit code to<br />
              <span className="font-semibold text-gray-900">{email}</span>
            </p>

            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                Verify Code
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button 
                onClick={() => alert('Code resent!')}
                className="text-sky-600 font-semibold hover:text-sky-700"
              >
                Resend
              </button>
            </p>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div>
            <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Create New Password</h1>
            <p className="text-gray-600 text-center mb-8">
              Your password must be at least 8 characters
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                minLength="8"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                minLength="8"
              />
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h1>
            <p className="text-gray-600 mb-8">
              Your password has been successfully reset.
              You can now login with your new password.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg font-semibold transition-colors"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;