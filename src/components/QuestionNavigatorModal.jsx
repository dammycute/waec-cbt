// components/QuestionNavigatorModal.jsx - Question Grid Modal
import React from 'react';

const QuestionNavigatorModal = ({ currentQuestion, totalQuestions, getQuestionStatus, goToQuestion, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Question Navigator</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-8 gap-2 mb-6">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(num => {
              const status = getQuestionStatus(num);
              return (
                <button
                  key={num}
                  onClick={() => goToQuestion(num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    status === 'current' ? 'bg-sky-500 text-white border-2 border-sky-600' :
                    status === 'answered' ? 'bg-green-500 text-white' :
                    status === 'flagged' ? 'bg-yellow-400 text-gray-800' :
                    'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-around text-sm border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <span className="text-gray-600">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-gray-600">Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigatorModal;