// components/QuestionReview.jsx - Mobile Question Review (#6)
import React from 'react';

const QuestionReview = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <header className="mb-4">
        <p>Question 5 of 40</p>
        <select className="float-right">
          <option>Show: All</option>
        </select>
      </header>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold">Question 5</h2>
        <p className="my-2">Question text...</p>
        <div className="space-y-2">
          <div className="p-3 rounded-md bg-pink-100">Option B ✗ (Your answer)</div>
          <div className="p-3 rounded-md bg-green-100">Option C ✓ (Correct)</div>
          {/* Other options gray */}
        </div>
        <div className="mt-4 bg-gray-100 p-3 rounded-md">
          <h3 className="font-bold">Explanation</h3>
          <p>Detailed explanation...</p>
        </div>
      </div>
      <div className="flex justify-between mt-auto">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default QuestionReview;