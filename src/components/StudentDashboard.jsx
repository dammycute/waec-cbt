// components/StudentDashboard.jsx - Mobile Student Dashboard (#1)
import React from 'react';
import BottomNavigation from './BottomNavigation';

const StudentDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <header className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-xl font-bold">Welcome back, Ada!</h1>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Profile icon */}
      </header>
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Tests taken: 12</p>
          <p>Avg Score: 75% <span className="text-green-500">↑</span></p>
        </div>
        <button className="w-full bg-blue-500 text-white p-4 rounded-lg font-bold">Start Practice Test</button>
        <section>
          <h2 className="text-lg font-bold mb-2">Recent Tests</h2>
          {/* Repeat for 3 cards */}
          <div className="bg-white p-4 rounded-lg shadow mb-2">Math - Oct 9 - 80% <a href="#" className="text-blue-500">Review</a></div>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">Focus Areas</h2>
          <div className="flex space-x-2">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full">Algebra</span>
            {/* More badges */}
          </div>
        </section>
        <p>Study Streak: 5 days 🔥</p>
      </main>
      <BottomNavigation active="Home" />
    </div>
  );
};

export default StudentDashboard;    