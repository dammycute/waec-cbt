import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, BarChart3, User, Settings, TrendingUp, Flame, Clock, BookOpen, Bell, Search, ChevronRight, Menu, X, RefreshCw } from 'lucide-react';
import { authService } from '../services/authService';
import  testService  from '../services/testService';
import { analyticsService } from '../services/analyticsService';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for dashboard data
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    testsTaken: 0,
    averageScore: 0,
    improvement: 0,
    studyStreak: 0,
    studyHours: 0
  });
  const [recentTests, setRecentTests] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([65, 70, 68, 75, 78, 82, 85]);

  // Check authentication on mount
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user data
      const userData = await authService.getCurrentUser();
      setUser(userData.data);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData.data));

      // Fetch analytics data
      try {
        const analyticsData = await analyticsService.getAnalytics();
        
        if (analyticsData.success && analyticsData.data) {
          const analytics = analyticsData.data;
          
          setStats({
            testsTaken: analytics.totalTests || 0,
            averageScore: Math.round(analytics.averageScore) || 0,
            improvement: calculateImprovement(analytics.weeklyProgress),
            studyStreak: analytics.currentStreak || 0,
            studyHours: Math.round(analytics.totalStudyTime / 60) || 0 // Convert minutes to hours
          });

          // Set focus areas from weaknesses
          if (analytics.weaknesses && analytics.weaknesses.length > 0) {
            setFocusAreas(analytics.weaknesses.slice(0, 3).map(weakness => ({
              topic: weakness,
              accuracy: Math.floor(Math.random() * 40) + 40 // Mock accuracy for now
            })));
          }

          // Set weekly progress
          if (analytics.weeklyProgress && analytics.weeklyProgress.length > 0) {
            const progressData = analytics.weeklyProgress.map(week => week.averageScore || 0);
            setWeeklyProgress(progressData);
          }
        }
      } catch (err) {
        console.log('Analytics not available, using defaults');
      }

      // Fetch recent tests with improved subject handling
      try {
        const recentTestsData = await analyticsService.getRecentTests(5);
        
        console.log('📊 Recent tests data:', recentTestsData);
        
        if (recentTestsData.success && recentTestsData.data) {
          const formattedTests = recentTestsData.data.map(attempt => {
            // Try multiple ways to get subject name
            let subjectName = 'Unknown Subject';
            
            // Check if test exists and has subject
            if (attempt.test && attempt.test.subject) {
              subjectName = attempt.test.subject.name;
            }
            // Check if testMetadata exists (for dynamic tests)
            else if (attempt.testMetadata && attempt.testMetadata.title) {
              subjectName = attempt.testMetadata.title;
            }
            // Check direct subject reference
            else if (attempt.subject) {
              subjectName = attempt.subject.name || attempt.subject;
            }

            console.log('🔍 Processing attempt:', {
              attemptId: attempt.id,
              hasTest: !!attempt.test,
              hasSubject: !!(attempt.test?.subject),
              hasTestMetadata: !!attempt.testMetadata,
              subjectName: subjectName
            });

            return {
              id: attempt.id,
              subject: subjectName,
              date: formatDate(attempt.completedAt),
              score: attempt.correctAnswers || 0,
              total: attempt.totalQuestions || 0,
              percentage: attempt.percentage || 0,
              trend: getTrend(attempt.percentage)
            };
          });
          
          console.log('✅ Formatted tests:', formattedTests);
          setRecentTests(formattedTests);
        }
      } catch (err) {
        console.error('❌ Error loading recent tests:', err);
        console.log('Recent tests not available');
      }

      // Fetch recommended tests
      try {
        const testsData = await testService.getTests({ limit: 3 });
        
        if (testsData.success && testsData.data) {
          const formattedRecommendations = testsData.data.slice(0, 3).map(test => ({
            testId: test.id,
            subject: test.subject?.name || 'Subject Test',
            topic: test.title,
            questions: test.totalQuestions,
            duration: `${test.duration} mins`
          }));
          setRecommendedTests(formattedRecommendations);
        }
      } catch (err) {
        console.log('Recommended tests not available');
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        authService.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getTrend = (percentage) => {
    if (percentage >= 70) return 'up';
    if (percentage >= 50) return 'neutral';
    return 'down';
  };

  const calculateImprovement = (weeklyProgress) => {
    if (!weeklyProgress || weeklyProgress.length < 2) return 0;
    const lastWeek = weeklyProgress[weeklyProgress.length - 1];
    const previousWeek = weeklyProgress[weeklyProgress.length - 2];
    return Math.round(lastWeek.averageScore - previousWeek.averageScore);
  };

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    navigate(path);
  };

  const handleStartTest = (testId) => {
    if (testId) {
      navigate(`/test/${testId}`);
    } else {
      navigate('/test-selection');
    }
  };

  const NavButton = ({ icon: Icon, label, tab, path }) => (
    <button
      onClick={() => handleNavigation(path, tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
        activeTab === tab
          ? 'bg-sky-50 text-sky-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={fetchDashboardData}
              className="flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">WAEC CBT</h1>
              </div>
            </div>
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <NavButton icon={Home} label="Dashboard" tab="dashboard" path="/dashboard" />
            <NavButton icon={FileText} label="Practice Tests" tab="tests" path="/test-selection" />
            <NavButton icon={BarChart3} label="Analytics" tab="analytics" path="/analytics" />
            <NavButton icon={User} label="Profile" tab="profile" path="/profile" />
            <NavButton icon={Settings} label="Settings" tab="settings" path="/change-password" />
          </div>
        </nav>

        {/* Start New Test Button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => handleStartTest()}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
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
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.fullName || 'Student'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.class || 'SS3'} • {user?.subscriptionPlan || 'Free'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="w-48 lg:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-sky-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stats.testsTaken}</p>
              <p className="text-xs lg:text-sm text-gray-600">Tests Taken</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                {stats.improvement > 0 && (
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                )}
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stats.averageScore}%</p>
              <p className="text-xs lg:text-sm text-gray-600">Average Score</p>
              {stats.improvement > 0 && (
                <p className="text-xs text-green-600 font-medium mt-1">+{stats.improvement}% this week</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stats.studyStreak}</p>
              <p className="text-xs lg:text-sm text-gray-600">Day Streak 🔥</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stats.studyHours}h</p>
              <p className="text-xs lg:text-sm text-gray-600">Study Hours</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              {/* Start Practice Test Card */}
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 lg:p-8 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Ready to Practice?</h3>
                <p className="text-sky-100 mb-4 lg:mb-6 text-sm lg:text-base">Choose a subject and start your test now</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                  <button 
                    onClick={() => handleStartTest()}
                    className="bg-white text-sky-600 hover:bg-sky-50 font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Start Practice Test
                  </button>
                  <select className="bg-transparent bg-opacity-20 text-white border border-white border-opacity-30 px-4 py-3 rounded-lg focus:outline-none backdrop-blur-sm">
                    <option className="text-gray-900">Mathematics</option>
                    <option className="text-gray-900">English</option>
                    <option className="text-gray-900">Biology</option>
                    <option className="text-gray-900">Chemistry</option>
                    <option className="text-gray-900">Physics</option>
                  </select>
                </div>
                {recentTests.length > 0 && (
                  <p className="text-xs text-sky-100 mt-4">
                    Last practiced: {recentTests[0].subject} ({recentTests[0].date})
                  </p>
                )}
              </div>

              {/* Recent Tests */}
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Tests</h3>
                  <button 
                    onClick={() => navigate('/analytics')}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {recentTests.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No tests taken yet</p>
                      <button 
                        onClick={() => navigate('/test-selection')}
                        className="text-sky-600 hover:text-sky-700 font-medium text-sm"
                      >
                        Start your first test →
                      </button>
                    </div>
                  ) : (
                    recentTests.slice(0, 3).map((test) => (
                      <div 
                        key={test.id} 
                        onClick={() => navigate(`/test-results`)}
                        className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 lg:gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{test.subject}</h4>
                            {test.trend === 'up' && <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />}
                          </div>
                          <p className="text-xs lg:text-sm text-gray-600">{test.date}</p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-lg lg:text-2xl font-bold text-sky-600">{test.percentage}%</p>
                          <p className="text-xs text-gray-500">{test.score}/{test.total}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-2 hidden sm:block" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Performance Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">This Week</span>
                      {stats.improvement > 0 && (
                        <span className="text-sm font-semibold text-green-600">+{stats.improvement}%</span>
                      )}
                    </div>
                    <div className="h-24 lg:h-32 flex items-end gap-1 lg:gap-2">
                      {weeklyProgress.map((height, i) => (
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
              {focusAreas.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 lg:p-6">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
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
                        <button 
                          onClick={() => navigate('/test-selection')}
                          className="text-xs text-sky-600 hover:text-sky-700 font-medium mt-2"
                        >
                          Practice Now →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Tests */}
          {recommendedTests.length > 0 && (
            <div className="mt-6 lg:mt-8">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {recommendedTests.map((test, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-sky-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{test.subject}</h4>
                    <p className="text-sm text-gray-600 mb-4">{test.topic}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span>{test.questions} questions</span>
                      <span>•</span>
                      <span>{test.duration}</span>
                    </div>
                    <button 
                      onClick={() => handleStartTest(test.testId)}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;