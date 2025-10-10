// components/StudentAnalytics.jsx - Mobile Student Analytics (#7)
import React from 'react';

const StudentAnalytics = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 overflow-y-auto" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <h1 className="text-xl font-bold mb-4">Your Performance</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">Tests Taken: 18</div>
        <div className="bg-white p-4 rounded-lg shadow">Average Score: 76%</div>
        {/* More stats */}
      </div>
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-2">Score Trend</h2>
        {/* Line chart placeholder - use Recharts */}
        <div className="bg-white p-4 rounded-lg shadow h-40">Chart here</div>
      </section>
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-2">Topic Performance</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="w-24">Algebra</p>
            <div className="flex-1 bg-green-200 h-4 rounded" style={{ width: '85%' }}></div>
            <p>85%</p>
          </div>
          {/* More */}
        </div>
      </section>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Focus on: Statistics, Trigonometry</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Start Practice</button>
      </div>
    </div>
  );
};

export default StudentAnalytics;