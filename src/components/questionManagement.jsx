import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Upload, Download, Loader, AlertCircle, X } from 'lucide-react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import api, { questionAPI } from '../services/api';

// Math Text Component
const MathText = ({ children, className = '' }) => {
  if (!children) return null;
  return (
    <span className={className}>
      <MathJax inline dynamic hideUntilTypeset="first">
        {children}
      </MathJax>
    </span>
  );
};

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [saving, setSaving] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    subject: '',
    topic: '',
    difficulty: '',
    page: 1,
    limit: 20
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });

  // Form state
  const [formData, setFormData] = useState({
    subjectId: '',
    topic: '',
    text: '',
    type: 'multiple-choice',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' }
    ],
    correctAnswer: '',
    explanation: '',
    difficulty: 'medium',
    points: 1,
    imageUrl: '',
    tags: []
  });

  const [bulkData, setBulkData] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchSubjects();
    fetchQuestions();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.topic) params.append('topic', filters.topic);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      params.append('page', filters.page);
      params.append('limit', filters.limit);

      const response = await api.get(`/questions?${params.toString()}`);

      if (response.data.success) {
        setQuestions(response.data.data);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalCount: response.data.count
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        subjectId: question.subjectId,
        topic: question.topic,
        text: question.text,
        type: question.type,
        options: question.options || [
          { id: 'A', text: '' },
          { id: 'B', text: '' },
          { id: 'C', text: '' },
          { id: 'D', text: '' }
        ],
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        difficulty: question.difficulty,
        points: question.points,
        imageUrl: question.imageUrl || '',
        tags: question.tags || []
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        subjectId: '',
        topic: '',
        text: '',
        type: 'multiple-choice',
        options: [
          { id: 'A', text: '' },
          { id: 'B', text: '' },
          { id: 'C', text: '' },
          { id: 'D', text: '' }
        ],
        correctAnswer: '',
        explanation: '',
        difficulty: 'medium',
        points: 1,
        imageUrl: '',
        tags: []
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subjectId) {
      alert('Please select a subject');
      return;
    }
    if (!formData.topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    if (!formData.text.trim()) {
      alert('Please enter the question text');
      return;
    }
    if (formData.type === 'multiple-choice') {
      const hasEmptyOptions = formData.options.some(opt => !opt.text.trim());
      if (hasEmptyOptions) {
        alert('Please fill in all answer options');
        return;
      }
    }
    if (!formData.correctAnswer) {
      alert('Please select the correct answer');
      return;
    }
    if (!formData.explanation.trim()) {
      alert('Please enter an explanation');
      return;
    }

    try {
      setSaving(true);

      if (editingQuestion) {
        await questionAPI.updateQuestion(editingQuestion.id, formData);
        alert('Question updated successfully!');
      } else {
        await questionAPI.createQuestion(formData);
        alert('Question created successfully!');
      }

      await fetchQuestions();
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to save question');
    } finally {
      setSaving(false);
    }
  };

  const handleBulkUpload = async () => {
    try {
      setSaving(true);
      const parsedData = JSON.parse(bulkData);

      if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
        throw new Error('Invalid format. Expected { "questions": [...] }');
      }

      const response = await questionAPI.bulkUploadQuestions(parsedData.questions);

      if (response.data.success) {
        alert(`Successfully uploaded ${response.data.data.count} questions!`);
        setBulkData('');
        setShowBulkUpload(false);
        await fetchQuestions();
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to upload questions. Please check your JSON format.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionAPI.deleteQuestion(id);
        alert('Question deleted successfully!');
        await fetchQuestions();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete question');
      }
    }
  };

  const handleOptionChange = (index, text) => {
    const newOptions = [...formData.options];
    newOptions[index].text = text;
    setFormData({ ...formData, options: newOptions });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const downloadTemplate = () => {
    const template = {
      questions: [
        {
          subjectId: "uuid-of-subject",
          topic: "Calculus",
          text: "Calculate the integral: \\(\\int_0^1 x^2 dx\\)",
          type: "multiple-choice",
          options: [
            { id: "A", text: "\\(\\frac{1}{3}\\)" },
            { id: "B", text: "\\(\\frac{1}{2}\\)" },
            { id: "C", text: "\\(1\\)" },
            { id: "D", text: "\\(\\frac{2}{3}\\)" }
          ],
          correctAnswer: "A",
          explanation: "Using the power rule: \\(\\int x^2 dx = \\frac{x^3}{3}\\), evaluate from 0 to 1",
          difficulty: "medium",
          points: 2,
          tags: ["integration", "calculus"]
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question-template.json';
    a.click();
  };

  const config = {
    loader: { load: ["input/tex", "output/chtml"] }
  };

  return (
    <MathJaxContext config={config}>
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Question Bank</h1>
              <p className="text-gray-600 mt-1">Manage test questions with mathematical notation</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkUpload(true)}
                className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <Upload className="w-5 h-5" />
                <span className="hidden sm:inline">Bulk Upload</span>
              </button>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Question</span>
              </button>
            </div>
          </div>

          {/* Math Notation Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 font-medium mb-2">💡 Writing Math Notation:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-blue-700">
              <div>• Inline math: <code className="bg-blue-100 px-1 rounded">\(x^2 + 5\)</code></div>
              <div>• Fractions: <code className="bg-blue-100 px-1 rounded">\(\frac{'{'}a{'}'}{'{'}b{'}'}\\)</code></div>
              <div>• Square root: <code className="bg-blue-100 px-1 rounded">\(\sqrt{'{'}x{'}'}\\)</code></div>
              <div>• Greek: <code className="bg-blue-100 px-1 rounded">\(\alpha, \beta, \pi\)</code></div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <select
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value, page: 1 })}
                className="p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Filter by topic..."
                value={filters.topic}
                onChange={(e) => setFilters({ ...filters, topic: e.target.value, page: 1 })}
                className="p-2 border border-gray-300 rounded-lg text-sm"
              />

              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value, page: 1 })}
                className="p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <button
                onClick={() => setFilters({ subject: '', topic: '', difficulty: '', page: 1, limit: 20 })}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{questions.length}</span> of{' '}
              <span className="font-semibold">{pagination.totalCount}</span> questions
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Questions List */}
          {loading && questions.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-sky-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                          {question.subject?.name}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">{question.topic}</span>
                      </div>
                      <MathText className="text-gray-900 font-medium mb-3 block">
                        {question.text}
                      </MathText>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {question.options?.map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 rounded-lg text-sm ${
                              option.id === question.correctAnswer
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="font-semibold">{option.id}.</span>{' '}
                            <MathText>{option.text}</MathText>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(question)}
                        className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Explanation:</span>{' '}
                      <MathText>{question.explanation}</MathText>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page === pagination.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {editingQuestion ? 'Edit Question' : 'Add New Question'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subjectId}
                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g., Algebra, Cell Biology"
                    required
                  />
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question * <span className="text-xs text-gray-500">(Use \(...\) for math)</span>
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
                    rows="3"
                    placeholder="e.g., Solve for \(x\): \(x^2 + 5x + 6 = 0\)"
                    required
                  />
                  {formData.text && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <MathText>{formData.text}</MathText>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer Options *
                  </label>
                  <div className="space-y-2">
                    {formData.options.map((option, index) => (
                      <div key={option.id}>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-semibold text-gray-700">
                            {option.id}
                          </span>
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
                            placeholder={`Option ${option.id} (e.g., \\(x = -2\\))`}
                            required
                          />
                        </div>
                        {option.text && (
                          <div className="ml-10 mt-1 p-2 bg-gray-50 rounded text-sm">
                            <MathText>{option.text}</MathText>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correct Answer *
                  </label>
                  <select
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  >
                    <option value="">Select correct answer</option>
                    {formData.options.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Explanation *
                  </label>
                  <textarea
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
                    rows="3"
                    placeholder="Explain why this is the correct answer..."
                    required
                  />
                  {formData.explanation && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <MathText>{formData.explanation}</MathText>
                    </div>
                  )}
                </div>

                {/* Difficulty and Points */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty *
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Points *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (Optional)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-sky-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </form>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : (editingQuestion ? 'Update Question' : 'Create Question')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Bulk Upload Questions</h2>
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Upload multiple questions using JSON format</p>
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Template
                  </button>
                </div>

                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  placeholder='Paste your JSON data here... Format: { "questions": [ {...}, {...} ] }'
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Format:</strong> Paste valid JSON with a "questions" array. Use LaTeX notation with \(...\) for math.
                  </p>
                  <p className="text-xs text-yellow-700 font-mono">
                    Example: "text": "Solve \(x^2 + 5x + 6 = 0\)"
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUpload}
                  disabled={!bulkData.trim() || saving}
                  className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {saving ? 'Uploading...' : 'Upload Questions'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
};

export default QuestionManagement;