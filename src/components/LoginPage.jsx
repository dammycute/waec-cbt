// components/LoginPage.jsx - Mobile Login Page (#11)
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <div className="w-full text-center mb-8">
        <h1 className="text-2xl font-bold">WAEC CBT Practice</h1>
        <p className="text-gray-600">Practice smarter, score higher</p>
      </div>
      <form className="w-full space-y-4">
        <input type="text" placeholder="Email or Phone" className="w-full p-3 border border-gray-300 rounded-md" />
        <div className="relative">
          <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md" />
          <button type="button" className="absolute right-3 top-3 text-gray-500">Show</button>
        </div>
        <a href="/forgot" className="text-sm text-blue-500 text-right block">Forgot Password?</a>
        <button className="w-full bg-blue-500 text-white p-3 rounded-md font-bold">Login</button>
      </form>
      <div className="my-4 text-gray-500">or</div>
      <a href="/register" className="text-blue-500">Don't have an account? Sign Up</a>
      <a href="/schools" className="mt-4 text-gray-600">For Schools</a>
    </div>
  );
};

export default LoginPage;