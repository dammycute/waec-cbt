// components/SchoolAdminDashboard.jsx - School Admin Dashboard (Desktop)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, BarChart3, Settings, LogOut, Plus, Download } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Students', value: '247', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active (7 days)', value: '189', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Tests Taken', value: '1,834', icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { label: 'Avg Score', value: '72%', icon: BarChart3, color: 'bg-orange-100 text-orange-600' }
  ];

  const recentActivity = [
    { student: 'John Doe', action: 'Completed Mathematics test', score: '85%', time: '2 mins ago' },
    { student: 'Jane Smith', action: 'Completed English test', score: '78%', time: '15 mins ago' },
    { student: 'Michael Johnson', action: 'Started Biology test', score: '-', time: '30 mins ago' },
    { student: 'Sarah Williams', action: 'Completed Chemistry test', score: '92%', time: '1 hour ago' },
    { student: 'David Brown', action: 'Completed Physics test', score: '67%', time: '2 hours ago' }
  ];

  const topPerformers = [
    { name: 'Sarah Williams', avgScore: 92, tests: 15 },
    { name: 'John Doe', avgScore: 88, tests: 18 },
    { name: 'Emily Davis', avgScore: 85, tests: 12 }
  ];

  const needsAttention = [
    { name: 'Mark Wilson', avgScore: 45, tests: 8 },
    { name: 'Lisa Anderson', avgScore: 52, tests: 10 },
    { name: 'Kevin Martinez', avgScore: 58, tests: 7 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-800">WAEC Admin</span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-sky-50 text-sky-600 rounded-lg font-medium">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => navigate('/student-management')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Users className="w-5 h-5" />
              <span>Student Management</span>
            </button>
            <button 
              onClick={() => navigate('/class-performance')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <FileText className="w-5 h-5" />
              <span>Class Performance</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Mr. Okafor</h1>
            <p className="text-gray-600">Bright Future Academy</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.student}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.score}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.tests} tests</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{student.avgScore}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs Attention */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Needs Attention</h3>
              <div className="space-y-3">
                {needsAttention.map((student, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.tests} tests</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{student.avgScore}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => navigate('/student-management')}
            className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600"
          >
            <Plus className="w-5 h-5" />
            Add Students
          </button>
          <button className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
            <FileText className="w-5 h-5" />
            Create Class
          </button>
          <button className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
            <Download className="w-5 h-5" />
            View Reports
          </button>
        </div>
      </main>
    </div>
  );
};

export default SchoolAdminDashboard;