// components/StudentManagementTable.jsx - Student Management (Desktop)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Upload, Plus, Download, MoreVertical, ArrowLeft } from 'lucide-react';

const StudentManagementTable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const students = [
    { id: 1, name: 'John Doe', class: 'SS3', email: 'john@example.com', tests: 10, avgScore: 75, status: 'Active' },
    { id: 2, name: 'Jane Smith', class: 'SS3', email: 'jane@example.com', tests: 12, avgScore: 82, status: 'Active' },
    { id: 3, name: 'Michael Johnson', class: 'SS2', email: 'michael@example.com', tests: 8, avgScore: 68, status: 'Active' },
    { id: 4, name: 'Sarah Williams', class: 'SS3', email: 'sarah@example.com', tests: 15, avgScore: 92, status: 'Active' },
    { id: 5, name: 'David Brown', class: 'SS1', email: 'david@example.com', tests: 6, avgScore: 70, status: 'Inactive' },
    { id: 6, name: 'Emily Davis', class: 'SS3', email: 'emily@example.com', tests: 11, avgScore: 85, status: 'Active' },
    { id: 7, name: 'Mark Wilson', class: 'SS2', email: 'mark@example.com', tests: 5, avgScore: 45, status: 'Active' },
    { id: 8, name: 'Lisa Anderson', class: 'SS3', email: 'lisa@example.com', tests: 9, avgScore: 78, status: 'Active' }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50">
                <Upload className="w-5 h-5" />
                Upload CSV
              </button>
              <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600">
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">Filter by Class: All</option>
            <option value="SS1">SS1</option>
            <option value="SS2">SS2</option>
            <option value="SS3">SS3</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Download className="w-5 h-5" />
            Export List
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tests Taken</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{student.class}</td>
                  <td className="px-6 py-4 text-gray-700">{student.email}</td>
                  <td className="px-6 py-4 text-gray-700">{student.tests}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      student.avgScore >= 75 ? 'text-green-600' :
                      student.avgScore >= 60 ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-8 of 247 students</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementTable;