import React, { useState } from 'react';
import { Home, FileText, BarChart3, User, Settings, TrendingUp, Flame, Clock, BookOpen, Bell, Search, ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    testsTaken: 12,
    averageScore: 75,
    improvement: 8,
    studyStreak: 5,
    studyHours: 24
  };

  const recentTests = [
    { id: 1, subject: 'Mathematics', date: 'Oct 5, 2025', score: 82, total: 40, trend: 'up' },
    { id: 2, subject: 'English', date: 'Oct 3, 2025', score: 78, total: 40, trend: 'up' },
    { id: 3, subject: 'Biology', date: 'Oct 1, 2025', score: 68, total: 40, trend: 'down' },
    { id: 4, subject: 'Chemistry', date: 'Sep 29, 2025', score: 72, total: 40, trend: 'up' },
    { id: 5, subject: 'Physics', date: 'Sep 27, 2025', score: 65, total: 40, trend: 'neutral' }
  ];

  const focusAreas = [
    { topic: 'Algebra', accuracy: 55 },
    { topic: 'Essay Writing', accuracy: 60 },
    { topic: 'Cell Biology', accuracy: 58 }
  ];

  const recommendedTests = [
    { subject: 'Mathematics', topic: 'Algebra Practice', questions: 20, duration: '30 mins' },
    { subject: 'English', topic: 'Comprehension', questions: 25, duration: '40 mins' },
    { subject: 'Biology', topic: 'Genetics', questions: 30, duration: '45 mins' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">WAEC CBT</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'tests'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Practice Tests</span>
            </button>
            <button
              onClick={() => setActiveTab('my-tests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'my-tests'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>My Tests</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Start New Test Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            Start New Test
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Ada Okonkwo</p>
              <p className="text-xs text-gray-500">SS3 Student</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-600">Welcome back, Ada!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sky-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.testsTaken}</p>
              <p className="text-sm text-gray-600">Tests Taken</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.averageScore}%</p>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-xs text-green-600 font-medium mt-1">+{stats.improvement}% this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.studyStreak}</p>
              <p className="text-sm text-gray-600">Day Streak 🔥</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.studyHours}h</p>
              <p className="text-sm text-gray-600">Study Hours</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Start Practice Test Card */}
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Ready to Practice?</h3>
                <p className="text-sky-100 mb-6">Choose a subject and start your test now</p>
                <div className="flex items-center gap-4">
                  <button className="bg-white text-sky-600 hover:bg-sky-50 font-semibold px-6 py-3 rounded-lg transition-colors">
                    Start Practice Test
                  </button>
                  <select className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 px-4 py-3 rounded-lg focus:outline-none backdrop-blur-sm">
                    <option className="text-gray-900">Mathematics</option>
                    <option className="text-gray-900">English</option>
                    <option className="text-gray-900">Biology</option>
                    <option className="text-gray-900">Chemistry</option>
                    <option className="text-gray-900">Physics</option>
                  </select>
                </div>
                <p className="text-xs text-sky-100 mt-4">Last practiced: Mathematics (2 days ago)</p>
              </div>

              {/* Recent Tests */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Tests</h3>
                  <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{test.subject}</h4>
                          {test.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-gray-600">{test.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-sky-600">{Math.round((test.score / test.total) * 100)}%</p>
                        <p className="text-xs text-gray-500">{test.score}/{test.total}</p>
                      </div>
                      <button className="ml-4 text-sky-600 hover:text-sky-700">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Performance Overview */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">This Week</span>
                      <span className="text-sm font-semibold text-green-600">+12%</span>
                    </div>
                    <div className="h-32 flex items-end gap-2">
                      {[65, 70, 68, 75, 78, 82, 85].map((height, i) => (
                        <div key={i} className="flex-1 bg-sky-500 rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Mon</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
                <p className="text-sm text-gray-600 mb-4">Topics needing improvement:</p>
                <div className="space-y-3">
                  {focusAreas.map((area, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{area.topic}</span>
                        <span className="text-sm text-gray-600">{area.accuracy}%</span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${area.accuracy}%` }}
                        />
                      </div>
                      <button className="text-xs text-sky-600 hover:text-sky-700 font-medium mt-2">
                        Practice Now →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
            <div className="grid grid-cols-3 gap-6">
              {recommendedTests.map((test, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{test.subject}</h4>
                  <p className="text-sm text-gray-600 mb-4">{test.topic}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span>{test.questions} questions</span>
                    <span>•</span>
                    <span>{test.duration}</span>
                  </div>
                  <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;