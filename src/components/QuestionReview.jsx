// components/QuestionReview.jsx - Question Review with Explanations
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const QuestionReview = () => {
  const navigate = useNavigate();
  const [reviewFilter, setReviewFilter] = useState('all');
  const [currentReviewQuestion, setCurrentReviewQuestion] = useState(1);

  // Mock questions data with answers
  const reviewQuestions = [
    {
      number: 1,
      text: "If x + 5 = 12, what is the value of x?",
      options: [
        { id: 'A', text: '7' },
        { id: 'B', text: '17' },
        { id: 'C', text: '5' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'A',
      userAnswer: 'A',
      explanation: "To solve for x, subtract 5 from both sides of the equation: x + 5 - 5 = 12 - 5, which gives x = 7."
    },
    {
      number: 2,
      text: "What is 15% of 200?",
      options: [
        { id: 'A', text: '15' },
        { id: 'B', text: '30' },
        { id: 'C', text: '25' },
        { id: 'D', text: '20' }
      ],
      correctAnswer: 'B',
      userAnswer: 'C',
      explanation: "To find 15% of 200, multiply: (15/100) × 200 = 0.15 × 200 = 30."
    },
    {
      number: 3,
      text: "Solve for y: 2y - 8 = 10",
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '8' },
        { id: 'C', text: '9' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'C',
      userAnswer: 'C',
      explanation: "Add 8 to both sides: 2y = 18. Then divide by 2: y = 9."
    },
    {
      number: 4,
      text: "What is the area of a rectangle with length 8cm and width 5cm?",
      options: [
        { id: 'A', text: '13 cm²' },
        { id: 'B', text: '26 cm²' },
        { id: 'C', text: '40 cm²' },
        { id: 'D', text: '80 cm²' }
      ],
      correctAnswer: 'C',
      userAnswer: 'B',
      explanation: "The area of a rectangle is length × width: 8 × 5 = 40 cm²."
    },
    {
      number: 5,
      text: "If a = 3 and b = 4, what is a² + b²?",
      options: [
        { id: 'A', text: '7' },
        { id: 'B', text: '12' },
        { id: 'C', text: '25' },
        { id: 'D', text: '49' }
      ],
      correctAnswer: 'C',
      userAnswer: 'C',
      explanation: "Calculate a² = 3² = 9, and b² = 4² = 16. Then add: 9 + 16 = 25."
    }
  ];

  const currentQuestion = reviewQuestions[currentReviewQuestion - 1];
  const isCorrect = currentQuestion.userAnswer === currentQuestion.correctAnswer;

  const goToPreviousReview = () => {
    if (currentReviewQuestion > 1) setCurrentReviewQuestion(currentReviewQuestion - 1);
  };

  const goToNextReview = () => {
    if (currentReviewQuestion < reviewQuestions.length) setCurrentReviewQuestion(currentReviewQuestion + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => navigate('/test-results')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Review Questions</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['all', 'incorrect', 'flagged'].map(filter => (
              <button
                key={filter}
                onClick={() => setReviewFilter(filter)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  reviewFilter === filter ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All Questions' : filter === 'incorrect' ? 'Incorrect Only' : 'Flagged'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="px-4 py-4 max-w-md mx-auto">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentReviewQuestion} of {reviewQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-sky-500 h-2 rounded-full transition-all"
            style={{ width: `${(currentReviewQuestion / reviewQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-4 space-y-4 max-w-md mx-auto">
        {/* Result Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isCorrect ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Correct</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Incorrect</span>
            </>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-600 mb-3">Question {currentQuestion.number}</h2>
          <p className="text-lg leading-relaxed text-gray-800 mb-6">{currentQuestion.text}</p>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isUserAnswer = option.id === currentQuestion.userAnswer;
              const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
              
              let optionClasses = 'p-4 rounded-xl border ';
              if (isCorrectAnswer) {
                optionClasses += 'bg-green-50 border-green-500 border-2';
              } else if (isUserAnswer && !isCorrect) {
                optionClasses += 'bg-red-50 border-red-500 border-2';
              } else {
                optionClasses += 'bg-gray-50 border-gray-300';
              }

              return (
                <div key={option.id} className={optionClasses}>
                  <span className="font-semibold text-gray-800 mr-2">{option.id}.</span>
                  <span className="text-gray-700">{option.text}</span>
                  {isCorrectAnswer && <span className="ml-2 text-sm text-green-600">(Correct answer)</span>}
                  {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-sm text-red-600">(Your answer)</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
              <p className="text-sm text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>

        {/* Study Tips for incorrect answers */}
        {!isCorrect && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm text-orange-800">
              <span className="font-semibold">💡 Tip:</span> Review the explanation above and try similar practice questions to master this concept.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-4 max-w-md mx-auto">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPreviousReview}
              disabled={currentReviewQuestion === 1}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentReviewQuestion === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-sky-500 text-white hover:bg-sky-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={goToNextReview}
              disabled={currentReviewQuestion === reviewQuestions.length}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentReviewQuestion === reviewQuestions.length 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-sky-500 text-white hover:bg-sky-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionReview;