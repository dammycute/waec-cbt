// components/TestResults.jsx - Mobile Test Results (#5)
import React from 'react';

const TestResults = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <div className="text-center my-8">
        <h1 className="text-5xl font-bold">32/40</h1>
        <p className="text-3xl">80%</p>
        <p className="text-xl">Great job! You're improving!</p>
        <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mt-2"></div> {/* Star icon */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">Completed in 45 minutes</div>
      <section>
        <h2 className="text-lg font-bold mb-2">By Topic</h2>
        {/* Bar charts - use a chart library like Recharts in production */}
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="w-24">Algebra</p>
            <div className="flex-1 bg-blue-200 h-4 rounded" style={{ width: '75%' }}></div>
            <p>75%</p>
          </div>
          {/* More bars */}
        </div>
      </section>
      <button className="w-full bg-blue-500 text-white p-4 rounded-lg my-4">Review Questions & Explanations</button>
      <button className="w-full border border-blue-500 text-blue-500 p-4 rounded-lg">Take Another Test</button>
      <a href="/dashboard" className="text-blue-500 text-center mt-4">Back to Dashboard</a>
    </div>
  );
};

export default TestResults;