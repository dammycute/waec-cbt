// src/components/StudentAnalytics.jsx - COMPLETE REDESIGN WITH BACKEND
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, FileText, BarChart3, User, TrendingUp, TrendingDown, 
  Flame, Clock, Target, AlertCircle, RefreshCw, Loader 
} from 'lucide-react';
import { analyticsService } from '../services/analyticsService';
import { authService } from '../services/authService';

const StudentAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Analytics data state
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    improvement: 0,
    studyHours: 0,
    streak: 0
  });

  const [recentScores, setRecentScores] = useState([]);
  const [topicPerformance, setTopicPerformance] = useState([]);
  const [subjectBreakdown, setSubjectBreakdown] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchAnalyticsData();
  }, [navigate, timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch main analytics
      const analyticsData = await analyticsService.getAnalytics();
      
      if (analyticsData.success && analyticsData.data) {
        const analytics = analyticsData.data;
        
        // Set basic stats
        setStats({
          totalTests: analytics.totalTests || 0,
          averageScore: Math.round(analytics.averageScore) || 0,
          improvement: calculateImprovement(analytics.weeklyProgress),
          studyHours: Math.round(analytics.totalStudyTime / 60) || 0,
          streak: analytics.currentStreak || 0
        });

        // Process subject breakdown
        if (analytics.subjectPerformance && analytics.subjectPerformance.length > 0) {
          const subjects = analytics.subjectPerformance.map(sp => ({
            subject: getSubjectName(sp.subjectId),
            tests: sp.totalTests || 0,
            avgScore: Math.round(sp.averageScore) || 0,
            trend: getTrendFromScore(sp.averageScore)
          }));
          setSubjectBreakdown(subjects);
        }

        // Process topic mastery
        if (analytics.topicMastery && analytics.topicMastery.length > 0) {
          const topics = analytics.topicMastery.map(tm => ({
            topic: tm.topic,
            score: Math.round(tm.mastery) || 0,
            total: tm.attemptsCount || 0,
            status: getTopicStatus(tm.mastery)
          }));
          setTopicPerformance(topics);
        }
      }

      // Fetch recent test scores for chart
      const recentTestsData = await analyticsService.getRecentTests(7);
      
      if (recentTestsData.success && recentTestsData.data) {
        const scores = recentTestsData.data.map((test, index) => ({
          test: index + 1,
          score: test.percentage || 0,
          date: formatShortDate(test.completedAt)
        }));
        setRecentScores(scores.reverse()); // Oldest first for chart
      }

      // Fetch focus areas
      try {
        const focusAreasData = await analyticsService.getFocusAreas();
        
        if (focusAreasData.success && focusAreasData.data) {
          setFocusAreas(focusAreasData.data.focusAreas || []);
          setRecommendations(focusAreasData.data.recommendations || []);
        }
      } catch (err) {
        console.log(err, 'Focus areas not available yet');
      }

    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.response?.data?.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalyticsData();
  };

  const handlePracticeNow = async (focusArea) => {
    try {
      console.log('🎯 Starting practice for:', focusArea.topic);
      
      // Generate topic-specific test
      const testData = await analyticsService.generateTopicPractice(
        focusArea.subject.id,
        focusArea.topic,
        10,
        'mixed'
      );

      if (testData.success) {
        // Navigate to test interface with generated test
        navigate('/test', {
          state: { testData: testData.data }
        });
      }
    } catch (error) {
      console.error('Error starting practice:', error);
      alert('Failed to start practice test. Please try again.');
    }
  };

  // Helper functions
  const calculateImprovement = (weeklyProgress) => {
    if (!weeklyProgress || weeklyProgress.length < 2) return 0;
    const recent = weeklyProgress.slice(-2);
    return Math.round(recent[1].averageScore - recent[0].averageScore);
  };

  const getSubjectName = (subjectId) => {
    const subjectMap = {
      'mathematics': 'Mathematics',
      'english': 'English',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'physics': 'Physics'
    };
    return subjectMap[subjectId] || 'Subject';
  };

  const getTrendFromScore = (score) => {
    if (score >= 70) return 'up';
    if (score >= 50) return 'neutral';
    return 'down';
  };

  const getTopicStatus = (mastery) => {
    if (mastery >= 80) return 'strong';
    if (mastery >= 70) return 'good';
    if (mastery >= 60) return 'improving';
    return 'weak';
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTopicColor = (status) => {
    const colors = {
      strong: 'bg-green-500',
      good: 'bg-blue-500',
      improving: 'bg-yellow-500',
      weak: 'bg-orange-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getTopicBgColor = (status) => {
    const colors = {
      strong: 'bg-green-50 border-green-200',
      good: 'bg-blue-50 border-blue-200',
      improving: 'bg-yellow-50 border-yellow-200',
      weak: 'bg-orange-50 border-orange-200'
    };
    return colors[status] || 'bg-gray-50 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    if (priority >= 8) return 'bg-red-100 text-red-700';
    if (priority >= 5) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  const getPriorityLabel = (priority) => {
    if (priority >= 8) return 'High Priority';
    if (priority >= 5) return 'Medium Priority';
    return 'Low Priority';
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Analytics</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-6 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold">Your Performance</h1>
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-sky-100">Track your progress and improve</p>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 max-w-4xl mx-auto">
        
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
            <p className={`text-2xl font-bold ${stats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.improvement > 0 ? '+' : ''}{stats.improvement}%
            </p>
            <p className="text-sm text-gray-500">Improvement</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.streak}</p>
            <p className="text-sm text-gray-500">Day Streak 🔥</p>
          </div>
        </div>

        {/* Score Trend Chart */}
        {recentScores.length > 0 && (
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

            {stats.improvement !== 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                {stats.improvement > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">
                      +{stats.improvement}% improvement over recent tests
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 font-medium">
                      {stats.improvement}% from recent tests
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Focus Areas - NEW FEATURE */}
        {focusAreas.length > 0 && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-6 h-6 text-orange-600" />
              <h2 className="text-lg font-semibold text-orange-900">Focus Areas - Topics You Need to Master</h2>
            </div>
            <p className="text-sm text-orange-800 mb-4">
              Based on your performance, here are topics that need immediate attention:
            </p>
            
            <div className="space-y-3">
              {focusAreas.map((area, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 border border-orange-200 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{area.topic}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(area.priority)}`}>
                          {getPriorityLabel(area.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {area.subject.name} • {area.questionsAvailable} questions available
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Mastery</p>
                      <p className="text-lg font-bold text-gray-900">{area.mastery}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                      <p className="text-lg font-bold text-gray-900">{area.accuracy}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Attempts</p>
                      <p className="text-lg font-bold text-gray-900">{area.attemptsCount}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{area.mastery}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${area.mastery}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handlePracticeNow(area)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    Practice Now - 10 Questions
                  </button>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-4 pt-4 border-t border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3">💡 Recommendations</h3>
                <div className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="text-lg">
                        {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🔵'}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{rec.title}</h4>
                        <p className="text-xs text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Topic Performance */}
        {topicPerformance.length > 0 && (
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
        )}

        {/* Subject Breakdown */}
        {subjectBreakdown.length > 0 && (
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
        )}

        {/* Study Streak */}
        {stats.streak > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-800">{stats.streak} Day Streak! 🔥</p>
                <p className="text-sm text-gray-600">You're on fire! Keep it up!</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.studyHours} hours total study time
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {stats.totalTests === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analytics Yet</h3>
            <p className="text-gray-600 mb-4">Take your first test to see your performance analytics</p>
            <button 
              onClick={() => navigate('/test-selection')}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Start Your First Test
            </button>
          </div>
        )}

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
            onClick={() => navigate('/profile')}
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