import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, Loader, CheckCircle, Info } from 'lucide-react';
import { subjectAPI } from '../services/api';
import axios from 'axios';

const TestSelection = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState('subject');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const testTypes = [
    { 
      id: 'quick', 
      name: 'Quick Practice', 
      questions: 20,
      duration: 30,
      description: 'Short practice session for focused learning',
      icon: '⚡',
      color: 'bg-amber-100 border-amber-500 text-amber-700'
    },
    { 
      id: 'subject', 
      name: 'Subject Test', 
      questions: 40,
      duration: 60,
      description: 'Comprehensive subject-specific assessment',
      icon: '📚',
      color: 'bg-blue-100 border-blue-500 text-blue-700'
    },
    { 
      id: 'mock', 
      name: 'Mock Exam', 
      questions: 50,
      duration: 180,
      description: 'Full WAEC simulation experience',
      icon: '🎓',
      color: 'bg-purple-100 border-purple-500 text-purple-700',
      isPremium: true
    }
  ];

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching subjects...');
      
      // Fetch subjects from the correct endpoint
      const response = await subjectAPI.getAllSubjects();
      
      // Debug: Log the entire response
      console.log('📦 Full API Response:', response);
      console.log('📦 Response Data:', response.data);
      console.log('📦 Response Structure:', JSON.stringify(response, null, 2));
      
      // Handle different response structures
      let subjectsData = [];
      
      if (response.data && response.data.success && response.data.data) {
        // Structure: { data: { success: true, data: [...] } }
        subjectsData = response.data.data;
        console.log('✅ Using response.data.data');
      } else if (response.data && Array.isArray(response.data)) {
        // Structure: { data: [...] }
        subjectsData = response.data;
        console.log('✅ Using response.data (array)');
      } else if (response.success && response.data) {
        // Structure: { success: true, data: [...] }
        subjectsData = response.data;
        console.log('✅ Using response.data (direct)');
      } else if (Array.isArray(response)) {
        // Structure: [...]
        subjectsData = response;
        console.log('✅ Using response (direct array)');
      } else {
        console.error('❌ Unexpected response structure:', response);
        throw new Error('Unable to parse subjects from response');
      }
      
      console.log('✅ Parsed subjects:', subjectsData);
      
      if (!Array.isArray(subjectsData) || subjectsData.length === 0) {
        throw new Error('No subjects found. Please add subjects first.');
      }
      
      setSubjects(subjectsData);
      
      // Auto-select first subject
      if (subjectsData.length > 0 && !selectedSubject) {
        setSelectedSubject(subjectsData[0]);
        console.log('✅ Auto-selected first subject:', subjectsData[0].name);
      }
    } catch (err) {
      console.error('❌ Error fetching subjects:', err);
      console.error('❌ Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to load subjects. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = async () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }

    try {
      setGenerating(true);
      setError(null);

      const testType = testTypes.find(t => t.id === selectedTestType);
      
      console.log('🎯 Generating test:', {
        subject: selectedSubject.name,
        subjectId: selectedSubject.id,
        type: selectedTestType,
        questions: testType.questions
      });

      // Generate test through backend
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Not authenticated. Please login again.');
      }
      
      const response = await axios.post(
        'https://waec-backend.vercel.app/api/tests/generate',
        {
          subjectId: selectedSubject.id,
          type: selectedTestType,
          questionCount: testType.questions,
          difficulty: 'mixed'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('✅ Test generated:', response.data);

      if (response.data.success) {
        const testData = response.data.data;
        
        // Store test data in sessionStorage
        sessionStorage.setItem('currentTest', JSON.stringify(testData));
        sessionStorage.setItem('testStartTime', new Date().toISOString());
        
        console.log('✅ Navigating to test interface...');
        
        // Navigate to test interface
        navigate('/test', { state: { testData } });
      } else {
        throw new Error(response.data.message || 'Failed to generate test');
      }
    } catch (err) {
      console.error('❌ Error generating test:', err);
      console.error('❌ Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to generate test. Please try again.'
      );
    } finally {
      setGenerating(false);
    }
  };

  const getSubjectIcon = (icon) => {
    const icons = {
      calculator: '🔢',
      book: '📚',
      microscope: '🔬',
      flask: '⚗️',
      zap: '⚡',
      'trending-up': '📈',
      landmark: '🏛️',
      'book-open': '📖'
    };
    return icons[icon] || '📚';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (error && subjects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Subjects</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={fetchSubjects}
              className="w-full bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 font-medium"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/create-subject')}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium"
            >
              Add Subjects First
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 lg:px-8 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={generating}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Select Your Test</h1>
              <p className="text-sm text-gray-600 hidden md:block">
                Choose subject and test type to begin
              </p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${selectedSubject ? 'bg-green-100' : 'bg-gray-100'}`}>
                {selectedSubject ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-500">1</div>
                )}
                <span className={`text-sm font-medium ${selectedSubject ? 'text-green-700' : 'text-gray-600'}`}>
                  Subject
                </span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200"></div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${selectedTestType ? 'bg-green-100' : 'bg-gray-100'}`}>
                {selectedTestType ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-500">2</div>
                )}
                <span className={`text-sm font-medium ${selectedTestType ? 'text-green-700' : 'text-gray-600'}`}>
                  Test Type
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 lg:px-8 py-6 lg:py-12 max-w-7xl mx-auto">
        {/* Error Alert */}
        {error && subjects.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Subject and Test Type Selection */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Choose Subject */}
            <section className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sm font-bold text-sky-600">1</span>
                Choose Subject
              </h2>
              
              {subjects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No subjects available yet.</p>
                  <button 
                    onClick={() => navigate('/create-subject')}
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
                  >
                    Add Subjects
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                  {subjects.map((subject) => {
                    const isSelected = selectedSubject?.id === subject.id;
                    
                    return (
                      <button
                        key={subject.id}
                        onClick={() => setSelectedSubject(subject)}
                        disabled={generating}
                        className={`p-4 lg:p-5 rounded-xl transition-all relative ${
                          isSelected 
                            ? 'bg-sky-50 border-2 border-sky-500 shadow-md scale-105' 
                            : 'bg-white border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-sky-300'
                        } ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div 
                            className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl transition-transform ${
                              isSelected ? 'scale-110' : ''
                            }`}
                            style={{ 
                              backgroundColor: isSelected ? subject.color + '30' : subject.color + '15'
                            }}
                          >
                            {getSubjectIcon(subject.icon)}
                          </div>
                          <div className="text-center">
                            <span className={`text-sm lg:text-base font-semibold block ${isSelected ? 'text-sky-700' : 'text-gray-700'}`}>
                              {subject.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {subject.code}
                            </span>
                            {subject.questionCount > 0 && (
                              <span className="text-xs text-gray-400 mt-1 block">
                                {subject.questionCount} questions
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-sky-500 absolute top-2 right-2" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Test Type - Rest of the component remains the same... */}
            <section className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sm font-bold text-sky-600">2</span>
                Select Test Type
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {testTypes.map((type) => {
                  const isSelected = selectedTestType === type.id;
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedTestType(type.id)}
                      disabled={generating}
                      className={`relative p-5 lg:p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected 
                          ? 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-500 shadow-lg scale-105' 
                          : 'bg-white border-gray-200 hover:border-sky-300 shadow-sm hover:shadow-md'
                      } ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {type.isPremium && (
                        <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                          PRO
                        </span>
                      )}
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{type.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-base lg:text-lg">{type.name}</h3>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-700 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{type.questions}</span>
                            <span className="text-gray-500">questions</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{type.duration}</span>
                            <span className="text-gray-500">mins</span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center gap-2 text-sky-600 font-medium text-sm pt-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Test Summary</h3>
              
              {selectedSubject ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: selectedSubject.color + '20' }}
                    >
                      {getSubjectIcon(selectedSubject.icon)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Subject</p>
                      <p className="font-semibold text-gray-800">{selectedSubject.name}</p>
                    </div>
                  </div>

                  {selectedTestType && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Test Details</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-semibold text-gray-800">
                            {testTypes.find(t => t.id === selectedTestType)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-semibold text-gray-800">
                            {testTypes.find(t => t.id === selectedTestType)?.questions}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-gray-800">
                            {testTypes.find(t => t.id === selectedTestType)?.duration} mins
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleStartTest}
                    disabled={!selectedSubject || generating}
                    className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all ${
                      !selectedSubject || generating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 transform hover:scale-105'
                    }`}
                  >
                    {generating ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Preparing Test...</span>
                      </div>
                    ) : (
                      'Start Test →'
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Info className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Select a subject and test type to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestSelection;