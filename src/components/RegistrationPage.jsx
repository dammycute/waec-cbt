// components/RegistrationPage.jsx - Mobile Registration (#12)
import React from 'react';

const RegistrationPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white p-4 overflow-y-auto" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <header className="flex items-center mb-4">
        <button className="text-blue-500">←</button>
        <h1 className="text-xl font-bold ml-4">Create Account</h1>
      </header>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md" />
        <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md" />
        <input type="tel" placeholder="Phone Number (+234)" className="w-full p-3 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-md" />
        <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-md" />
        <select className="w-full p-3 border rounded-md">
          <option>School Name</option>
        </select>
        <select className="w-full p-3 border rounded-md">
          <option>Class: SS1</option>
          {/* Options */}
        </select>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="plan" /> Free (5 tests/month)
          </label>
          <label className="flex items-center">
            <input type="radio" name="plan" /> Premium ₦2,500/month (unlimited)
          </label>
        </div>
        <label className="flex items-center text-sm">
          <input type="checkbox" /> I agree to <a href="#" className="text-blue-500">Terms & Privacy Policy</a>
        </label>
        <button className="w-full bg-blue-500 text-white p-3 rounded-md">Create Account</button>
      </form>
      <a href="/login" className="text-blue-500 text-center mt-4">Already have an account? Login</a>
    </div>
  );
};

export default RegistrationPage;