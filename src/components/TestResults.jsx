// components/TestResults.jsx - Backend Integrated Version
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Award, TrendingUp, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resultData, setResultData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [isAutoSubmit, setIsAutoSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResults = () => {
      try {
        // Get data from navigation state (passed from TestInterface)
        if (location.state?.resultData && location.state?.testData) {
          setResultData(location.state.resultData);
          setTestData(location.state.testData);
          setIsAutoSubmit(location.state.isAutoSubmit || false);
          
          // Store in sessionStorage for page refresh
          sessionStorage.setItem('testResults', JSON.stringify(location.state.resultData));
          sessionStorage.setItem('completedTestData', JSON.stringify(location.state.testData));
          setLoading(false);
        } 
        // Try to load from sessionStorage if page was refreshed
        else {
          const savedResults = sessionStorage.getItem('testResults');
          const savedTestData = sessionStorage.getItem('completedTestData');
          
          if (savedResults && savedTestData) {
            setResultData(JSON.parse(savedResults));
            setTestData(JSON.parse(savedTestData));
            setLoading(false);
          } else {
            setError('No test results found. Please complete a test first.');
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading results:', err);
        setError('Failed to load test results');
        setLoading(false);
      }
    };

    loadResults();
  }, [location.state]);

  const getEncouragementMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! You're a star! 🌟";
    if (percentage >= 80) return "Excellent work! You're well prepared! 💪";
    if (percentage >= 70) return "Great job! You're improving! 📈";
    if (percentage >= 60) return "Good effort! Keep practicing! 📚";
    if (percentage >= 50) return "You passed! Keep pushing forward! 🎯";
    return "Keep going! Practice makes perfect! 💪";
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 border-green-300';
    if (percentage >= 70) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (percentage >= 50) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const getTopicColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  const handleReviewQuestions = () => {
    // Navigate to question review page with attempt ID
    navigate('/question-review', {
      state: {
        attemptId: resultData.attemptId,
        testData: testData
      }
    });
  };

  const handleTakeAnotherTest = () => {
    // Clear session storage
    sessionStorage.removeItem('testResults');
    sessionStorage.removeItem('completedTestData');
    navigate('/test-selection');
  };

  const handleBackToDashboard = () => {
    // Clear session storage
    sessionStorage.removeItem('testResults');
    sessionStorage.removeItem('completedTestData');
    navigate('/dashboard');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
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

  if (!resultData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pb-8">
      {/* Auto-submit notification */}
      {isAutoSubmit && (
        <div className="bg-orange-100 border-l-4 border-orange-500 px-6 py-4">
          <div className="max-w-md mx-auto flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800">Time's Up!</p>
              <p className="text-sm text-orange-700">Your test was automatically submitted when the time ran out.</p>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="mb-4">
            {resultData.percentage >= 50 ? (
              <div className="inline-block animate-bounce">
                <Award className="w-20 h-20 text-yellow-300 mx-auto" />
              </div>
            ) : (
              <AlertCircle className="w-20 h-20 text-white mx-auto opacity-80" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">Test Complete!</h1>
          <p className="text-sky-100 text-lg">
            {testData.subject?.name || testData.title} • {testData.type.charAt(0).toUpperCase() + testData.type.slice(1)} Test
          </p>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4 max-w-md mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(resultData.percentage)}`}>
              {resultData.score}/{resultData.correctAnswers + resultData.incorrectAnswers + resultData.unanswered}
            </div>
            <div className="text-5xl font-bold text-gray-800 mb-4">{resultData.percentage}%</div>
            
            {/* Grade Badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-xl font-bold ${getGradeColor(resultData.percentage)}`}>
              Grade: {getGrade(resultData.percentage)}
            </div>
          </div>

          {/* Pass/Fail Status */}
          <div className="mb-4">
            {resultData.percentage >= 50 ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-5 h-5" />
                Passed
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                <XCircle className="w-5 h-5" />
                Keep Practicing
              </div>
            )}
          </div>

          <p className="text-lg text-gray-700 font-medium mt-4">
            {getEncouragementMessage(resultData.percentage)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Correct Answers */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{resultData.correctAnswers}</p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
            </div>
          </div>

          {/* Incorrect Answers */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{resultData.incorrectAnswers}</p>
                <p className="text-xs text-gray-500">Incorrect</p>
              </div>
            </div>
          </div>

          {/* Time Taken */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{resultData.timeTaken}</p>
                <p className="text-xs text-gray-500">Minutes</p>
              </div>
            </div>
          </div>

          {/* Unanswered */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{resultData.unanswered}</p>
                <p className="text-xs text-gray-500">Skipped</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        {resultData.topicPerformance && resultData.topicPerformance.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              Performance by Topic
            </h2>
            <div className="space-y-4">
              {resultData.topicPerformance.map((topic, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{topic.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{topic.correct}/{topic.attempted}</span>
                      <span className="text-sm font-bold text-gray-800">{topic.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getTopicColor(topic.percentage)}`}
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleReviewQuestions}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            Review Questions & Explanations
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleTakeAnotherTest}
            className="w-full bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold py-4 px-6 rounded-xl shadow-sm transition-colors"
          >
            Take Another Test
          </button>
          
          <button
            onClick={handleBackToDashboard}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;