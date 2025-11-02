
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader, AlertCircle, BookOpen, Search } from 'lucide-react';
import subjectService from '../services/subjectService';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    icon: 'book',
    color: '#3B82F6',
    topics: []
  });
  const [topicInput, setTopicInput] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await subjectService.getAllSubjects();
      if (response.success) {
        setSubjects(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({
        name: subject.name,
        code: subject.code,
        description: subject.description || '',
        icon: subject.icon || 'book',
        color: subject.color || '#3B82F6',
        topics: subject.topics || []
      });
    } else {
      setEditingSubject(null);
      setFormData({
        name: '',
        code: '',
        description: '',
        icon: 'book',
        color: '#3B82F6',
        topics: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      icon: 'book',
      color: '#3B82F6',
      topics: []
    });
    setTopicInput({ name: '', description: '' });
  };

  const handleAddTopic = () => {
    if (topicInput.name.trim()) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, { ...topicInput }]
      }));
      setTopicInput({ name: '', description: '' });
    }
  };

  const handleRemoveTopic = (index) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingSubject) {
        await subjectService.updateSubject(editingSubject.id, formData);
      } else {
        await subjectService.createSubject(formData);
      }
      await fetchSubjects();
      handleCloseModal();
    } catch (err) {
      alert(err.message || 'Failed to save subject');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        setLoading(true);
        await subjectService.deleteSubject(id);
        await fetchSubjects();
      } catch (err) {
        alert(err.message || 'Failed to delete subject');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableSubjects = [
    'Mathematics', 'English', 'Biology', 'Chemistry', 
    'Physics', 'Economics', 'Government', 'Literature'
  ];

  const iconOptions = [
    { value: 'calculator', label: '🔢 Calculator', icon: 'calculator' },
    { value: 'book', label: '📚 Book', icon: 'book' },
    { value: 'microscope', label: '🔬 Microscope', icon: 'microscope' },
    { value: 'flask', label: '⚗️ Flask', icon: 'flask' },
    { value: 'zap', label: '⚡ Zap', icon: 'zap' },
    { value: 'trending-up', label: '📈 Trending', icon: 'trending-up' },
    { value: 'landmark', label: '🏛️ Landmark', icon: 'landmark' },
    { value: 'book-open', label: '📖 Book Open', icon: 'book-open' }
  ];

  if (loading && subjects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
            <p className="text-gray-600 mt-1">Manage subjects and topics</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
          >
            <Plus className="w-5 h-5" />
            Add Subject
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: subject.color + '20' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: subject.color }} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(subject)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{subject.code}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{subject.description}</p>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-semibold text-gray-900">{subject.questionCount || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Topics</span>
                  <span className="font-semibold text-gray-900">{subject.topics?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try a different search term' : 'Get started by adding a new subject'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600"
              >
                <Plus className="w-5 h-5" />
                Add Subject
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subject Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Name *
                  </label>
                  <select
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select subject</option>
                    {availableSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Code *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g., MATH"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows="3"
                    placeholder="Brief description of the subject"
                  />
                </div>

                {/* Icon & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics
                  </label>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={topicInput.name}
                      onChange={(e) => setTopicInput({ ...topicInput, name: e.target.value })}
                      placeholder="Topic name"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={topicInput.description}
                      onChange={(e) => setTopicInput({ ...topicInput, description: e.target.value })}
                      placeholder="Topic description"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddTopic}
                      className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                    >
                      Add Topic
                    </button>
                  </div>

                  {formData.topics.length > 0 && (
                    <div className="space-y-2">
                      {formData.topics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{topic.name}</p>
                            <p className="text-xs text-gray-600">{topic.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveTopic(index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 disabled:bg-gray-300"
                >
                  {loading ? 'Saving...' : editingSubject ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;