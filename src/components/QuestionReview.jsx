// components/QuestionReview.jsx - Backend Integrated
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const API_BASE_URL = 'https://waec-backend.vercel.app/api';

const QuestionReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [reviewFilter, setReviewFilter] = useState('all');
  const [currentReviewQuestion, setCurrentReviewQuestion] = useState(0);
  const [reviewData, setReviewData] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testInfo, setTestInfo] = useState(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Get attemptId from location state or sessionStorage
        let attemptId = location.state?.attemptId;
        
        if (!attemptId) {
          // Try to get from test results in session storage
          const savedResults = sessionStorage.getItem('testResults');
          if (savedResults) {
            const results = JSON.parse(savedResults);
            attemptId = results.attemptId;
          }
        }

        if (!attemptId) {
          setError('No test attempt found. Please complete a test first.');
          setLoading(false);
          return;
        }

        console.log('📥 Fetching review for attempt:', attemptId);

        const response = await fetch(`${API_BASE_URL}/reviews/${attemptId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch review data');
        }

        console.log('✅ Review data received:', result);

        setReviewData(result.data);
        setTestInfo(result.data.testInfo);
        setFilteredQuestions(result.data.questions);
        setLoading(false);

        // Store in session storage for refresh
        sessionStorage.setItem('reviewData', JSON.stringify(result.data));

      } catch (err) {
        console.error('❌ Error fetching review:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [location.state, navigate]);

  useEffect(() => {
    if (!reviewData) return;

    let filtered = [...reviewData.questions];

    if (reviewFilter === 'incorrect') {
      filtered = filtered.filter(q => !q.isCorrect && q.userAnswer);
    } else if (reviewFilter === 'flagged') {
      filtered = filtered.filter(q => q.flagged);
    } else if (reviewFilter === 'correct') {
      filtered = filtered.filter(q => q.isCorrect);
    }
    // 'all' shows everything

    setFilteredQuestions(filtered);
    setCurrentReviewQuestion(0); // Reset to first question when filter changes
  }, [reviewFilter, reviewData]);

  const goToPreviousReview = () => {
    if (currentReviewQuestion > 0) {
      setCurrentReviewQuestion(currentReviewQuestion - 1);
    }
  };

  const goToNextReview = () => {
    if (currentReviewQuestion < filteredQuestions.length - 1) {
      setCurrentReviewQuestion(currentReviewQuestion + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading review...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/test-results')}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Review Questions</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No questions match this filter</p>
            <button
              onClick={() => setReviewFilter('all')}
              className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              Show All Questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentReviewQuestion];
  const isCorrect = currentQuestion.isCorrect;

  return (
    <MathJaxContext>
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
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-800">Review Questions</h1>
                {testInfo && (
                  <p className="text-sm text-gray-500">
                    Score: {testInfo.percentage}% • {testInfo.score}/{testInfo.totalQuestions}
                  </p>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['all', 'incorrect', 'correct', 'flagged'].map(filter => {
                let count = 0;
                if (reviewData) {
                  if (filter === 'all') count = reviewData.questions.length;
                  else if (filter === 'incorrect') count = reviewData.stats.incorrectAnswers;
                  else if (filter === 'correct') count = reviewData.stats.correctAnswers;
                  else if (filter === 'flagged') count = reviewData.stats.flaggedQuestions;
                }

                return (
                  <button
                    key={filter}
                    onClick={() => setReviewFilter(filter)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      reviewFilter === filter ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div>{filter === 'all' ? 'All' : filter === 'incorrect' ? 'Wrong' : filter === 'correct' ? 'Right' : 'Flagged'}</div>
                    <div className="text-xs opacity-75">({count})</div>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        <div className="px-4 py-4 max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentReviewQuestion + 1} of {filteredQuestions.length}</span>
            <span className="text-xs text-gray-500">
              Original #{currentQuestion.number}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sky-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentReviewQuestion + 1) / filteredQuestions.length) * 100}%` }}
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
            {currentQuestion.flagged && (
              <span className="ml-2 text-xs">🚩 Flagged</span>
            )}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-600">Question {currentQuestion.number}</h2>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                  {currentQuestion.topic}
                </span>
              </div>
            </div>

            <MathJax className="text-lg leading-relaxed text-gray-800 mb-6">
              {currentQuestion.text}
            </MathJax>

            {currentQuestion.imageUrl && (
              <div className="mb-6">
                <img src={currentQuestion.imageUrl} alt="Question" className="w-full rounded-lg" />
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => {
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
                    <MathJax inline className="text-gray-700">
                      {option.text}
                    </MathJax>
                    {isCorrectAnswer && <span className="ml-2 text-sm text-green-600 font-medium">✓ Correct answer</span>}
                    {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-sm text-red-600 font-medium">✗ Your answer</span>}
                  </div>
                );
              })}
            </div>

            {!currentQuestion.userAnswer && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">⚠️ You did not answer this question</p>
              </div>
            )}
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
                <MathJax className="text-sm text-blue-800 leading-relaxed">
                  {currentQuestion.explanation}
                </MathJax>
              </div>
            </div>
          </div>

          {/* Study Tips for incorrect answers */}
          {!isCorrect && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm text-orange-800">
                <span className="font-semibold">💡 Tip:</span> Review the explanation above and try similar practice questions on <span className="font-medium">{currentQuestion.topic}</span> to master this concept.
              </p>
            </div>
          )}

          {/* Time Taken */}
          {currentQuestion.timeTaken && (
            <div className="text-xs text-gray-500 text-center">
              Time taken: {Math.floor(currentQuestion.timeTaken / 60)}:{(currentQuestion.timeTaken % 60).toString().padStart(2, '0')} minutes
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 max-w-md mx-auto">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goToPreviousReview}
                disabled={currentReviewQuestion === 0}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentReviewQuestion === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-sky-500 text-white hover:bg-sky-600'
                }`}
              >
                Previous
              </button>
              <button
                onClick={goToNextReview}
                disabled={currentReviewQuestion === filteredQuestions.length - 1}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentReviewQuestion === filteredQuestions.length - 1
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
    </MathJaxContext>
  );
};

export default QuestionReview;