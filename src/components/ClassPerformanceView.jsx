// components/ClassPerformanceView.jsx - Class Performance Dashboard (Desktop)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, TrendingUp, TrendingDown } from 'lucide-react';

const ClassPerformanceView = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('SS3A');
  const [dateRange, setDateRange] = useState('last-30-days');

  const classStats = {
    avgScore: 74,
    testsCompleted: 156,
    completionRate: 87,
    activeStudents: 35,
    totalStudents: 40
  };

  const subjectPerformance = [
    { subject: 'Mathematics', avgScore: 68, color: 'bg-blue-500' },
    { subject: 'English', avgScore: 78, color: 'bg-green-500' },
    { subject: 'Biology', avgScore: 72, color: 'bg-purple-500' },
    { subject: 'Chemistry', avgScore: 70, color: 'bg-orange-500' },
    { subject: 'Physics', avgScore: 65, color: 'bg-red-500' }
  ];

  const studentPerformance = [
    { rank: 1, name: 'Sarah Williams', tests: 15, avgScore: 92, lastActive: '2 hours ago', trend: 'up' },
    { rank: 2, name: 'John Doe', tests: 18, avgScore: 88, lastActive: '1 day ago', trend: 'up' },
    { rank: 3, name: 'Emily Davis', tests: 12, avgScore: 85, lastActive: '3 hours ago', trend: 'up' },
    { rank: 4, name: 'Jane Smith', tests: 14, avgScore: 82, lastActive: '5 hours ago', trend: 'neutral' },
    { rank: 5, name: 'Michael Johnson', tests: 10, avgScore: 78, lastActive: '1 day ago', trend: 'up' },
    { rank: 6, name: 'David Brown', tests: 11, avgScore: 75, lastActive: '2 days ago', trend: 'neutral' },
    { rank: 7, name: 'Lisa Anderson', tests: 13, avgScore: 72, lastActive: '6 hours ago', trend: 'down' },
    { rank: 8, name: 'Mark Wilson', tests: 9, avgScore: 68, lastActive: '3 days ago', trend: 'down' }
  ];

  const topicsNeedingAttention = [
    { topic: 'Algebra', avgScore: 55, subject: 'Mathematics' },
    { topic: 'Essay Writing', avgScore: 62, subject: 'English' },
    { topic: 'Cell Biology', avgScore: 58, subject: 'Biology' }
  ];

  const handleDownloadReport = () => {
    alert('Downloading class performance report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class Performance</h1>
              <p className="text-gray-600 mt-1">Detailed analytics for your classes</p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="SS3A">Class: SS3A</option>
                <option value="SS3B">Class: SS3B</option>
                <option value="SS2A">Class: SS2A</option>
                <option value="SS1A">Class: SS1A</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="last-90-days">Last 90 days</option>
                <option value="all-time">All time</option>
              </select>
              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600"
              >
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-3xl font-bold text-gray-900">{classStats.avgScore}%</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5% from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Tests Completed</p>
            <p className="text-3xl font-bold text-gray-900">{classStats.testsCompleted}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-gray-900">{classStats.completionRate}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Active Students</p>
            <p className="text-3xl font-bold text-gray-900">
              {classStats.activeStudents}/{classStats.totalStudents}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Performance by Subject */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance by Subject</h2>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                    <span className="font-bold text-gray-900">{subject.avgScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${subject.color} h-3 rounded-full transition-all`}
                      style={{ width: `${subject.avgScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Needing Attention */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-900 mb-4">Topics Needing Attention</h3>
            <div className="space-y-4">
              {topicsNeedingAttention.map((topic, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{topic.topic}</p>
                      <p className="text-xs text-gray-600">{topic.subject}</p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">{topic.avgScore}%</span>
                  </div>
                  <p className="text-xs text-gray-600">Class average below 60%</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600">
              Create Focus Session
            </button>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Student Performance Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tests Taken</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Active</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trend</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentPerformance.map((student) => (
                  <tr key={student.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        student.rank <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{student.name}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.tests}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${
                        student.avgScore >= 80 ? 'text-green-600' :
                        student.avgScore >= 70 ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.lastActive}</td>
                    <td className="px-6 py-4">
                      {student.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                      {student.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                      {student.trend === 'neutral' && <div className="w-5 h-0.5 bg-gray-400"></div>}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">📊 Recommendations</h3>
          <div className="space-y-3 text-blue-800">
            <p>• Schedule additional practice sessions for Algebra to improve class performance</p>
            <p>• Mark Wilson and Lisa Anderson need individual attention - their scores are declining</p>
            <p>• Consider peer tutoring: pair top performers with students needing assistance</p>
            <p>• Mathematics has the lowest class average - recommend focus group sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPerformanceView;