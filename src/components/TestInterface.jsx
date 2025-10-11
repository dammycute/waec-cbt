// components/TestInterface.jsx - Mobile Test Interface (CBT)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionNavigatorModal from './QuestionNavigatorModal';

const TestInterface = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [flagged, setFlagged] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60 + 23); // 45:23
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  const totalQuestions = 40;
  const selectedSubject = sessionStorage.getItem('selectedSubject') || 'Mathematics';

  // Sample question
  const question = {
    number: currentQuestion,
    text: "If x + 5 = 12, what is the value of x?",
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '17' },
      { id: 'C', text: '5' },
      { id: 'D', text: '12' }
    ]
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load answer for current question
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] || null);
    setFlagged(flaggedQuestions.has(currentQuestion));
  }, [currentQuestion, answers, flaggedQuestions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'text-red-600';
    if (timeRemaining <= 300) return 'text-orange-600';
    return 'text-gray-800';
  };

  const handleSelectAnswer = (optionId) => {
    setSelectedAnswer(optionId);
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
  };

  const handleToggleFlag = () => {
    setFlagged(!flagged);
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (flagged) newSet.delete(currentQuestion);
      else newSet.add(currentQuestion);
      return newSet;
    });
  };

  const goToPrevious = () => currentQuestion > 1 && setCurrentQuestion(currentQuestion - 1);
  const goToNext = () => currentQuestion < totalQuestions && setCurrentQuestion(currentQuestion + 1);
  const goToQuestion = (num) => { setCurrentQuestion(num); setShowQuestionGrid(false); };

  const getQuestionStatus = (num) => {
    if (num === currentQuestion) return 'current';
    if (flaggedQuestions.has(num)) return 'flagged';
    if (answers[num]) return 'answered';
    return 'unanswered';
  };

  const handleSubmit = () => {
    const score = Math.floor(Math.random() * 10) + 30;
    const results = {
      score: score,
      total: totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timeTaken: '42 minutes',
      subject: selectedSubject,
      topics: [
        { name: 'Algebra', score: 85 },
        { name: 'Geometry', score: 75 },
        { name: 'Statistics', score: 60 }
      ]
    };
    sessionStorage.setItem('testResults', JSON.stringify(results));
    navigate('/test-results');
  };

  const SubmitModal = () => {
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = totalQuestions - answeredCount;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Test?</h3>
          <div className="space-y-3 mb-6">
            <p className="text-gray-700"><span className="font-semibold">Answered:</span> {answeredCount} questions</p>
            <p className="text-gray-700"><span className="font-semibold">Unanswered:</span> {unansweredCount} questions</p>
            {unansweredCount > 0 && (
              <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                ⚠️ You have {unansweredCount} unanswered questions. Are you sure?
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Fixed Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{selectedSubject}</span>
            <span className={`text-lg font-bold tabular-nums ${getTimerColor()}`}>{formatTime(timeRemaining)}</span>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">{currentQuestion} / {totalQuestions}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full">
        <h2 className="text-base font-semibold text-gray-600 mb-4">Question {question.number}</h2>
        <p className="text-lg leading-relaxed text-gray-800 mb-6">{question.text}</p>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected ? 'bg-blue-50 border-sky-500 shadow-md' : 'bg-white border-gray-300 hover:border-sky-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-sky-500' : 'border-gray-400'
                  }`}>
                    {isSelected && <div className="w-3 h-3 rounded-full bg-sky-500" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 mr-2">{option.id}.</span>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Flag for Review */}
        <button onClick={handleToggleFlag} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            flagged ? 'bg-yellow-400 border-yellow-500' : 'border-gray-400'
          }`}>
            {flagged && (
              <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span>Flag for review</span>
        </button>

        {/* Auto-save Indicator */}
        {selectedAnswer && (
          <div className="mt-4 text-xs text-green-600 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Answer saved</span>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <footer className="bg-white border-t border-gray-200 shadow-lg sticky bottom-0">
        <div className="px-4 py-4 max-w-md mx-auto">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 1}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setShowQuestionGrid(true)}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              disabled={currentQuestion === totalQuestions}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === totalQuestions ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showQuestionGrid && (
        <QuestionNavigatorModal
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          getQuestionStatus={getQuestionStatus}
          goToQuestion={goToQuestion}
          onClose={() => setShowQuestionGrid(false)}
        />
      )}
      {showSubmitModal && <SubmitModal />}
    </div>
  );
};

export default TestInterface;