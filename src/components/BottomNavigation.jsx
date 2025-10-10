// components/BottomNavigation.jsx - Mobile Bottom Nav (#15)
import React from 'react';

const BottomNavigation = ({ active }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <button className={`flex flex-col items-center ${active === 'Home' ? 'text-blue-500' : 'text-gray-500'}`}>
        <span>🏠</span>
        <p>Home</p>
      </button>
      <button className={`flex flex-col items-center ${active === 'Tests' ? 'text-blue-500' : 'text-gray-500'}`}>
        <span>📝</span>
        <p>Tests</p>
      </button>
      <button className={`flex flex-col items-center ${active === 'Analytics' ? 'text-blue-500' : 'text-gray-500'}`}>
        <span>📊</span>
        <p>Analytics</p>
      </button>
      <button className={`flex flex-col items-center ${active === 'Profile' ? 'text-blue-500' : 'text-gray-500'}`}>
        <span>👤</span>
        <p>Profile</p>
      </button>
    </nav>
  );
};

export default BottomNavigation;