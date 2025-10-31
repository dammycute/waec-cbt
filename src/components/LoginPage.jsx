import React, { useState } from 'react';
import { loginUser } from '../services/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser(formData.email, formData.password);
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = user.role === 'admin' ? '/admin-dashboard' : '/dashboard';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your email"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <span>Hide</span>
                ) : (
                  <span>Show</span>
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 text-white font-semibold py-2 rounded hover:bg-sky-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          <a href="/forgot-password" className="text-sky-500 hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
