// components/TestScheduling.jsx - Schedule Mock Exams for Classes
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Plus, Edit2, Trash2 } from 'lucide-react';

const TestScheduling = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    subject: '',
    date: '',
    startTime: '',
    duration: '60',
    totalQuestions: '40'
  });

  const scheduledTests = [
    {
      id: 1,
      title: 'Mid-Term Mathematics Exam',
      class: 'SS3A',
      subject: 'Mathematics',
      date: '2024-10-20',
      time: '09:00 AM',
      duration: '60 mins',
      questions: 40,
      students: 35,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'English Mock Test',
      class: 'SS3A',
      subject: 'English',
      date: '2024-10-22',
      time: '10:00 AM',
      duration: '60 mins',
      questions: 40,
      students: 35,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Biology Practice Test',
      class: 'SS2A',
      subject: 'Biology',
      date: '2024-10-18',
      time: '11:00 AM',
      duration: '45 mins',
      questions: 30,
      students: 28,
      status: 'completed'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating test:', formData);
    alert('Test scheduled successfully!');
    setShowCreateModal(false);
    setFormData({
      title: '',
      class: '',
      subject: '',
      date: '',
      startTime: '',
      duration: '60',
      totalQuestions: '40'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this scheduled test?')) {
      alert('Test deleted!');
    }
  };

  const CreateTestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Schedule New Test</h2>
          <button 
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Mid-Term Mathematics Exam"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Select Class</option>
                <option value="SS3A">SS3A</option>
                <option value="SS3B">SS3B</option>
                <option value="SS2A">SS2A</option>
                <option value="SS2B">SS2B</option>
                <option value="SS1A">SS1A</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Economics">Economics</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="15"
                max="180"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
              <input
                type="number"
                name="totalQuestions"
                value={formData.totalQuestions}
                onChange={handleChange}
                min="10"
                max="100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Students in the selected class will be automatically notified about this scheduled test.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600"
            >
              Schedule Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Test Scheduling</h1>
              <p className="text-gray-600 mt-1">Schedule and manage mock exams for your classes</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600"
            >
              <Plus className="w-5 h-5" />
              Schedule New Test
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="px-6 py-2 bg-sky-500 text-white rounded-lg font-medium">
            Upcoming
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Completed
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            All Tests
          </button>
        </div>

        {/* Scheduled Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduledTests.map((test) => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  test.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {test.status.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(test.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Test Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{test.class} • {test.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(test.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{test.time} • {test.duration}</span>
                </div>
              </div>

              {/* Test Details */}
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-600">Questions</p>
                  <p className="font-semibold text-gray-900">{test.questions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Students</p>
                  <p className="font-semibold text-gray-900">{test.students}</p>
                </div>
                {test.status === 'upcoming' && (
                  <button className="text-sm text-sky-600 font-medium hover:text-sky-700">
                    View Details →
                  </button>
                )}
                {test.status === 'completed' && (
                  <button className="text-sm text-green-600 font-medium hover:text-green-700">
                    View Results →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {scheduledTests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Scheduled Tests</h3>
            <p className="text-gray-600 mb-6">
              You haven't scheduled any tests yet. Create your first test to get started.
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600"
            >
              <Plus className="w-5 h-5" />
              Schedule Your First Test
            </button>
          </div>
        )}
      </div>

      {/* Create Test Modal */}
      {showCreateModal && <CreateTestModal />}
    </div>
  );
};

export default TestScheduling;