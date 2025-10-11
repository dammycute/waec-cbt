// components/BottomNavigation.jsx - Reusable Bottom Navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, BarChart3, User } from 'lucide-react';

const BottomNavigation = ({ active }) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'tests', label: 'Tests', icon: FileText, path: '/test-selection' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => item.path === '/profile' ? alert('Profile coming soon') : navigate(item.path)}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-sky-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;