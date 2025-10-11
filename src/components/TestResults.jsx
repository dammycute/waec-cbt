// components/TestResults.jsx - Test Results Screen
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const TestResults = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    const results = sessionStorage.getItem('testResults');
    if (results) {
      setTestResults(JSON.parse(results));
    } else {
      // If no results, redirect to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!testResults) return null;

  const getEncouragementMessage = (percentage) => {
    if (percentage >= 80) return "Excellent work! You're well prepared! 🌟";
    if (percentage >= 70) return "Great job! You're improving! 💪";
    if (percentage >= 60) return "Good effort! Keep practicing! 📚";
    return "Keep going! Practice makes perfect! 🎯";
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-8 text-white">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Test Complete!</h1>
          <p className="text-sky-100">{testResults.subject}</p>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4 max-w-md mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-4">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(testResults.percentage)}`}>
              {testResults.score}/{testResults.total}
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-4">{testResults.percentage}%</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {testResults.percentage >= 50 ? '✓ Passed' : '○ Keep Practicing'}
            </div>
          </div>
          <p className="text-lg text-gray-700 font-medium mt-4">{getEncouragementMessage(testResults.percentage)}</p>
        </div>

        {/* Time Taken */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Taken</p>
              <p className="font-semibold text-gray-800">{testResults.timeTaken}</p>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance by Topic</h2>
          <div className="space-y-4">
            {testResults.topics.map((topic, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                  <span className="text-sm font-bold text-gray-800">{topic.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      topic.score >= 75 ? 'bg-green-500' : topic.score >= 60 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${topic.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate('/question-review')}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-colors"
          >
            Review Questions & Explanations
          </button>
          <button
            onClick={() => navigate('/test-selection')}
            className="w-full bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold py-4 px-6 rounded-xl shadow-sm transition-colors"
          >
            Take Another Test
          </button>
          <button
            onClick={() => navigate('/dashboard')}
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