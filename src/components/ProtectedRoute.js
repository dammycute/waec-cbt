// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;