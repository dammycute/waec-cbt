// components/StudentDashboard.jsx - Mobile Student Dashboard
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, BarChart3, User, TrendingUp, Flame, BookOpen } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const recentTests = [
    { subject: 'Mathematics', date: 'Oct 5, 2025', score: 82 },
    { subject: 'English', date: 'Oct 3, 2025', score: 78 },
    { subject: 'Biology', date: 'Oct 1, 2025', score: 68 }
  ];

  const focusAreas = ['Algebra', 'Essay Writing', 'Cell Biology'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Welcome back, Ada!</h1>
            <p className="text-sm text-gray-500">Let's continue your WAEC prep</p>
          </div>
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-sky-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto overflow-y-auto">
        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tests taken</p>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Avg Score</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-gray-800">75%</p>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+8% from last week</span>
          </div>
        </div>

        {/* Start Practice Test Button */}
        <button 
          onClick={() => navigate('/test-selection')}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-3 transition-colors"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-lg">Start Practice Test</span>
        </button>

        {/* Study Streak */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">5 Day Streak! 🔥</p>
              <p className="text-sm text-gray-600">Keep it up! Study today to maintain your streak</p>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Tests</h2>
          <div className="space-y-3">
            {recentTests.map((test, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{test.subject}</h3>
                  <span className="text-2xl font-bold text-sky-600">{test.score}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{test.date}</p>
                  <button 
                    onClick={() => navigate('/question-review')}
                    className="text-sm text-sky-600 font-medium hover:text-sky-700"
                  >
                    Review →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Focus Areas */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Focus Areas</h2>
          <p className="text-sm text-gray-600 mb-3">Topics you should practice more:</p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((topic, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-3 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1 text-sky-600"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
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
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Analytics</span>
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

export default StudentDashboard;