// components/StudentAnalytics.jsx - Student Performance Analytics
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, BarChart3, User, TrendingUp, TrendingDown, Flame, Clock } from 'lucide-react';

const StudentAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');

  const stats = {
    totalTests: 18,
    averageScore: 76,
    improvement: 12,
    studyHours: 24,
    streak: 5
  };

  const recentScores = [
    { test: 1, score: 65, date: 'Sep 28' },
    { test: 2, score: 68, date: 'Sep 30' },
    { test: 3, score: 72, date: 'Oct 2' },
    { test: 4, score: 70, date: 'Oct 4' },
    { test: 5, score: 75, date: 'Oct 5' },
    { test: 6, score: 78, date: 'Oct 7' },
    { test: 7, score: 82, date: 'Oct 9' }
  ];

  const topicPerformance = [
    { topic: 'Algebra', score: 85, total: 20, status: 'strong' },
    { topic: 'Geometry', score: 78, total: 15, status: 'good' },
    { topic: 'Statistics', score: 70, total: 12, status: 'good' },
    { topic: 'Trigonometry', score: 65, total: 10, status: 'improving' },
    { topic: 'Calculus', score: 55, total: 8, status: 'weak' }
  ];

  const subjectBreakdown = [
    { subject: 'Mathematics', tests: 6, avgScore: 78, trend: 'up' },
    { subject: 'English', tests: 5, avgScore: 82, trend: 'up' },
    { subject: 'Biology', tests: 4, avgScore: 68, trend: 'down' },
    { subject: 'Chemistry', tests: 2, avgScore: 72, trend: 'up' },
    { subject: 'Physics', tests: 1, avgScore: 65, trend: 'neutral' }
  ];

  const getTopicColor = (status) => {
    switch(status) {
      case 'strong': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'improving': return 'bg-yellow-500';
      case 'weak': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getTopicBgColor = (status) => {
    switch(status) {
      case 'strong': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'improving': return 'bg-yellow-50 border-yellow-200';
      case 'weak': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-6 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Your Performance</h1>
          <p className="text-sky-100">Track your progress and improve</p>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 max-w-md mx-auto">
        
        {/* Time Range Selector */}
        <div className="bg-white rounded-xl shadow-sm p-1 flex gap-1">
          {['week', 'month', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-sky-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalTests}</p>
            <p className="text-sm text-gray-500">Tests Taken</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.averageScore}%</p>
            <p className="text-sm text-gray-500">Average Score</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">+{stats.improvement}%</p>
            <p className="text-sm text-gray-500">Improvement</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.studyHours}h</p>
            <p className="text-sm text-gray-500">Study Time</p>
          </div>
        </div>

        {/* Score Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Score Trend</h2>
          
          <div className="relative h-40 mb-4">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            
            <div className="ml-8 h-full border-l border-b border-gray-200 relative">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-100"></div>
                ))}
              </div>
              
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline
                  points={recentScores.map((item, index) => {
                    const x = (index / (recentScores.length - 1)) * 100;
                    const y = 100 - item.score;
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                {recentScores.map((item, index) => {
                  const x = (index / (recentScores.length - 1)) * 100;
                  const y = 100 - item.score;
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="#0EA5E9"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="ml-8 flex justify-between text-xs text-gray-500">
            {recentScores.filter((_, i) => i % 2 === 0 || i === recentScores.length - 1).map((item) => (
              <span key={item.test}>{item.date}</span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">
              +{stats.improvement}% improvement over last 7 tests
            </span>
          </div>
        </div>

        {/* Topic Performance */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Topic Performance</h2>
          
          <div className="space-y-3">
            {topicPerformance.map((topic) => (
              <div key={topic.topic} className={`border rounded-xl p-4 ${getTopicBgColor(topic.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{topic.topic}</h3>
                    <p className="text-xs text-gray-500">{topic.total} questions attempted</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{topic.score}%</p>
                    <span className="text-xs font-medium capitalize px-2 py-1 rounded-full bg-white">
                      {topic.status}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getTopicColor(topic.status)}`}
                    style={{ width: `${topic.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Focus */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Recommended Focus
          </h2>
          <p className="text-sm text-orange-800 mb-3">
            Based on your performance, we recommend focusing on these topics:
          </p>
          <div className="space-y-2">
            {topicPerformance
              .filter(t => t.status === 'weak' || t.status === 'improving')
              .map((topic) => (
                <div key={topic.topic} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="font-medium text-gray-800">{topic.topic}</span>
                  <button 
                    onClick={() => navigate('/test-selection')}
                    className="text-sm text-sky-600 font-medium hover:text-sky-700"
                  >
                    Practice →
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">By Subject</h2>
          <div className="space-y-3">
            {subjectBreakdown.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                    {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {subject.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-xs text-gray-500">{subject.tests} tests taken</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{subject.avgScore}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-800">{stats.streak} Day Streak! 🔥</p>
              <p className="text-sm text-gray-600">You're on fire! Keep it up!</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-3 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => navigate('/test-selection')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Tests</span>
          </button>
          <button 
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center gap-1 text-sky-600"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-medium">Analytics</span>
          </button>
          <button 
            onClick={() => alert('Profile coming soon')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default StudentAnalytics;