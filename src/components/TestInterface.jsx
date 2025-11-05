// components/TestInterface.jsx - Fixed with better radio buttons
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const API_BASE_URL = 'https://waec-backend.vercel.app/api';

const TestInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [flagged, setFlagged] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime] = useState(new Date());

  useEffect(() => {
    const loadTestData = async () => {
      try {
        if (location.state?.testData) {
          const test = location.state.testData;
          setTestData(test);
          setTimeRemaining(test.duration * 60);
          sessionStorage.setItem('activeTest', JSON.stringify(test));
          sessionStorage.setItem('testStartTime', startTime.toISOString());
          setLoading(false);
        } else {
          const savedTest = sessionStorage.getItem('activeTest');
          const savedStartTime = sessionStorage.getItem('testStartTime');
          
          if (savedTest && savedStartTime) {
            const test = JSON.parse(savedTest);
            setTestData(test);
            const elapsed = Math.floor((new Date() - new Date(savedStartTime)) / 1000);
            const remaining = Math.max(0, (test.duration * 60) - elapsed);
            setTimeRemaining(remaining);
            setLoading(false);
          } else {
            setError('No test data found. Please start a test from the dashboard.');
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading test:', err);
        setError('Failed to load test data');
        setLoading(false);
      }
    };

    loadTestData();
  }, [location.state, startTime]);

  useEffect(() => {
    if (!testData || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testData, timeRemaining]);

  useEffect(() => {
    if (!testData) return;
    setSelectedAnswer(answers[currentQuestion]?.selectedAnswer || null);
    setFlagged(flaggedQuestions.has(currentQuestion));
  }, [currentQuestion, answers, flaggedQuestions, testData]);

  useEffect(() => {
    if (testData) {
      sessionStorage.setItem('testAnswers', JSON.stringify(answers));
      sessionStorage.setItem('flaggedQuestions', JSON.stringify([...flaggedQuestions]));
    }
  }, [answers, flaggedQuestions, testData]);

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
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        question: testData.questions[currentQuestion].id,
        selectedAnswer: optionId,
        timeTaken: Math.floor((new Date() - startTime) / 1000),
        flagged: flaggedQuestions.has(currentQuestion)
      }
    }));
  };

  const handleToggleFlag = () => {
    setFlagged(!flagged);
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (flagged) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const goToPrevious = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
  const goToNext = () => currentQuestion < testData.questions.length - 1 && setCurrentQuestion(currentQuestion + 1);
  const goToQuestion = (num) => { setCurrentQuestion(num); setShowQuestionGrid(false); };

  const getQuestionStatus = (num) => {
    if (num === currentQuestion) return 'current';
    if (flaggedQuestions.has(num)) return 'flagged';
    if (answers[num]) return 'answered';
    return 'unanswered';
  };

  const handleAutoSubmit = async () => {
    await submitTest(true);
  };

  const submitTest = async (isAutoSubmit = false) => {
    try {
      setLoading(true);
      setShowSubmitModal(false);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to submit test');
        navigate('/login');
        return;
      }

      const formattedAnswers = Object.values(answers);

      const submissionData = {
        answers: formattedAnswers,
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
        testData: testData
      };

      console.log('📤 Submitting test:', {
        testId: testData.id,
        answerCount: formattedAnswers.length,
        totalQuestions: testData.questions.length
      });

      const response = await fetch(
        `${API_BASE_URL}/tests/${testData.id}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(submissionData)
        }
      );

      const result = await response.json();
      console.log('📥 Backend response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit test');
      }

      if (!result.success || !result.data) {
        throw new Error('Invalid response from server');
      }

      console.log('✅ Test submitted successfully');

      sessionStorage.removeItem('activeTest');
      sessionStorage.removeItem('testStartTime');
      sessionStorage.removeItem('testAnswers');
      sessionStorage.removeItem('flaggedQuestions');

      navigate('/test-results', {
        state: {
          resultData: result.data,
          testData: testData,
          isAutoSubmit
        },
        replace: true
      });

    } catch (err) {
      console.error('❌ Error submitting test:', err);
      alert(`Failed to submit test: ${err.message}`);
      setLoading(false);
      setShowSubmitModal(true);
    }
  };

  const handleSubmit = () => setShowSubmitModal(true);
  const confirmSubmit = () => { 
    setShowSubmitModal(false); 
    submitTest(false); 
  };

  if (loading && !testData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error && !testData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/test-selection')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Return to Test Selection
          </button>
        </div>
      </div>
    );
  }

  if (!testData || !testData.questions || testData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">No questions available</p>
      </div>
    );
  }

  const currentQuestionData = testData.questions[currentQuestion];
  const totalQuestions = testData.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const QuestionNavigatorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Question Navigator</h3>
          <button onClick={() => setShowQuestionGrid(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <div className="grid grid-cols-5 gap-2 mb-4">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const status = getQuestionStatus(i);
            let bgColor = 'bg-gray-200';
            if (status === 'current') bgColor = 'bg-sky-500 text-white';
            else if (status === 'flagged') bgColor = 'bg-yellow-400';
            else if (status === 'answered') bgColor = 'bg-green-500 text-white';

            return (
              <button
                key={i}
                onClick={() => goToQuestion(i)}
                className={`${bgColor} p-3 rounded-lg font-semibold hover:opacity-80 transition-opacity`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-green-500 rounded"></div><span>Answered</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-yellow-400 rounded"></div><span>Flagged</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-200 rounded"></div><span>Not Answered</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-sky-500 rounded"></div><span>Current</span></div>
        </div>
      </div>
    </div>
  );

  const SubmitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Test?</h3>
        <div className="space-y-3 mb-6">
          <p className="text-gray-700"><span className="font-semibold">Answered:</span> {answeredCount} questions</p>
          <p className="text-gray-700"><span className="font-semibold">Unanswered:</span> {unansweredCount} questions</p>
          {unansweredCount > 0 && (
            <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              ⚠️ You have {unansweredCount} unanswered questions. Are you sure you want to submit?
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSubmitModal(false)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={confirmSubmit}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <MathJaxContext>
      <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{testData.subject?.name || testData.title}</span>
            <span className={`text-lg font-bold tabular-nums ${getTimerColor()}`}>{formatTime(timeRemaining)}</span>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 transition-colors"
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">{currentQuestion + 1} / {totalQuestions}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full">
        <h2 className="text-base font-semibold text-gray-600 mb-4">Question {currentQuestion + 1}</h2>
        <MathJax className="text-lg leading-relaxed text-gray-800 mb-6">
          {currentQuestionData.text}
        </MathJax>

        {currentQuestionData.imageUrl && (
          <div className="mb-6">
            <img src={currentQuestionData.imageUrl} alt="Question" className="w-full rounded-lg" />
          </div>
        )}

        <div className="space-y-3 mb-6">
          {currentQuestionData.options?.map((option) => {
            const isSelected = selectedAnswer === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected 
                    ? 'bg-sky-50 border-sky-500 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-sky-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? 'border-sky-500 bg-sky-500' : 'border-gray-400 bg-white'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 mr-2">{option.id}.</span>
                    <MathJax inline className={`${isSelected ? 'text-sky-900 font-medium' : 'text-gray-700'}`}>
                      {option.text}
                    </MathJax>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button 
          onClick={handleToggleFlag} 
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
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

        {selectedAnswer && (
          <div className="mt-4 text-xs text-green-600 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Answer saved</span>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 shadow-lg sticky bottom-0">
        <div className="px-4 py-4 max-w-md mx-auto">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-sky-500 text-white hover:bg-sky-600'
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
              disabled={currentQuestion === totalQuestions - 1}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === totalQuestions - 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-sky-500 text-white hover:bg-sky-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </footer>

      {showQuestionGrid && <QuestionNavigatorModal />}
      {showSubmitModal && <SubmitModal />}
    </div>
    </MathJaxContext>
  );
};

export default TestInterface;