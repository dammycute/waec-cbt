// components/TestInterface.jsx - Mobile Test Interface (#3)
import React, { useState } from 'react';
import QuestionNavigatorModal from './QuestionNavigatorModal';

const TestInterface = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <header className="fixed top-0 left-0 right-0 bg-white p-4 shadow z-10" style={{ maxWidth: '375px', margin: '0 auto' }}>
        <div className="flex justify-between items-center">
          <p>Mathematics</p>
          <p>45:23</p>
          <button className="text-blue-500">Submit</button>
        </div>
        <p className="text-center">15 / 40</p>
      </header>
      <main className="flex-1 pt-20 pb-16 overflow-y-auto p-4">
        <h2 className="text-lg font-bold">Question 15</h2>
        <p className="my-4">Question text here...</p>
        {/* Options */}
        <div className="space-y-2">
          <label className="block bg-white border p-3 rounded-md">
            <input type="radio" name="option" /> Option A
          </label>
          {/* Repeat for B, C, D */}
        </div>
        <label className="flex items-center mt-4">
          <input type="checkbox" /> Flag for review
        </label>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between shadow" style={{ maxWidth: '375px', margin: '0 auto' }}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Grid</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </footer>
      {showModal && <QuestionNavigatorModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TestInterface;