// components/TestSelection.jsx - Mobile Test Selection (#2)
import React from 'react';

const TestSelection = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <header className="flex items-center mb-4">
        <button className="text-blue-500">←</button>
        <h1 className="text-xl font-bold ml-4">Select Test</h1>
      </header>
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">Choose Subject</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
            <div className="text-2xl mb-2">📐</div> {/* Icon */}
            Mathematics
          </div>
          {/* Repeat for other subjects */}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">Test Type</h2>
        <label className="block mb-2">
          <input type="radio" name="type" /> Quick Practice (20 questions, 30 mins)
        </label>
        {/* More options */}
      </section>
      <button className="w-full bg-blue-500 text-white p-4 rounded-lg">Start Test</button>
    </div>
  );
};

export default TestSelection;