// components/QuestionNavigatorModal.jsx - Mobile Modal (#4)
import React from 'react';

const QuestionNavigatorModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white w-full max-w-[375px] rounded-t-lg p-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Questions Overview</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {/* Example circles */}
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">1</div>
          <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">5</div>
          {/* Generate 40 */}
        </div>
        <div className="mt-4 flex space-x-4">
          <p><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>Answered</p>
          {/* Legend */}
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigatorModal;