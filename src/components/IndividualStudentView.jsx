// components/IndividualStudentView.jsx - Detailed Student View for Admins
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, TrendingUp, TrendingDown, Download, MessageSquare } from 'lucide-react';

const IndividualStudentView = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock student data
  const studentData = {
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+234 803 123 4567',
    class: 'SS3A',
    enrollmentDate: 'Sep 1, 2024',
    lastActive: '2 hours ago',
    overallStats: {
      testsCompleted: 15,
      averageScore: 92,
      studyHours: 45,
      improvement: 18,
      rank: 1,
      totalStudents: 40
    }
  };

  const testHistory = [
    { date: 'Oct 9, 2024', subject: 'Mathematics', score: 95, time: '58 mins', trend: 'up' },
    { date: 'Oct 7, 2024', subject: 'English', score: 88, time: '52 mins', trend: 'neutral' },
    { date: 'Oct 5, 2024', subject: 'Biology', score: 92, time: '60 mins', trend: 'up' },
    { date: 'Oct 3, 2024', subject: 'Chemistry', score: 90, time: '55 mins', trend: 'up' },
    { date: 'Oct 1, 2024', subject: 'Physics', score: 85, time: '59 mins', trend: 'down' }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', tests: 5, avgScore: 94, trend: 'up' },
    { subject: 'English', tests: 4, avgScore: 88, trend: 'neutral' },
    { subject: 'Biology', tests: 3, avgScore: 90, trend: 'up' },
    { subject: 'Chemistry', tests: 2, avgScore: 89, trend: 'up' },
    { subject: 'Physics', tests: 1, avgScore: 85, trend: 'neutral' }
  ];

  const topicStrengths = [
    { topic: 'Algebra', score: 98, subject: 'Mathematics' },
    { topic: 'Geometry', score: 95, subject: 'Mathematics' },
    { topic: 'Grammar', score: 92, subject: 'English' }
  ];

  const topicWeaknesses = [
    { topic: 'Mechanics', score: 78, subject: 'Physics' },
    { topic: 'Organic Chemistry', score: 82, subject: 'Chemistry' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/class-performance')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Class Performance</span>
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{studentData.name}</h1>
              <p className="text-gray-600">{studentData.class} • Rank #{studentData.overallStats.rank} of {studentData.overallStats.totalStudents}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                <MessageSquare className="w-5 h-5" />
                Send Message
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Student Info Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-600">Email</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{studentData.email}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-600">Phone</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{studentData.phone}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Enrolled</p>
            <p className="text-sm font-medium text-gray-900">{studentData.enrollmentDate}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Last Active</p>
            <p className="text-sm font-medium text-gray-900">{studentData.lastActive}</p>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Tests Completed</p>
            <p className="text-3xl font-bold text-gray-900">{studentData.overallStats.testsCompleted}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-3xl font-bold text-green-600">{studentData.overallStats.averageScore}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Study Hours</p>
            <p className="text-3xl font-bold text-gray-900">{studentData.overallStats.studyHours}h</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Improvement</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-green-600">+{studentData.overallStats.improvement}%</p>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Test History</h2>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div className="space-y-3">
                {testHistory.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-gray-900">{test.subject}</p>
                        {test.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {test.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                      </div>
                      <p className="text-sm text-gray-600">{test.date} • {test.time}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        test.score >= 90 ? 'text-green-600' :
                        test.score >= 75 ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {test.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance by Subject</h2>
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">{subject.subject}</span>
                        {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      </div>
                      <span className="text-sm text-gray-600">{subject.tests} tests</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${subject.avgScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 w-12 text-right">{subject.avgScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Strengths */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">💪 Strengths</h3>
              <div className="space-y-3">
                {topicStrengths.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{topic.topic}</p>
                        <p className="text-xs text-gray-600">{topic.subject}</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">{topic.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4">📚 Needs Focus</h3>
              <div className="space-y-3">
                {topicWeaknesses.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{topic.topic}</p>
                        <p className="text-xs text-gray-600">{topic.subject}</p>
                      </div>
                      <span className="text-lg font-bold text-orange-600">{topic.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                Assign Practice
              </button>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Teacher Notes</h3>
              <textarea
                placeholder="Add notes about this student..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                rows="4"
              ></textarea>
              <button className="w-full mt-3 px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualStudentView;