// components/TestSelection.jsx - Mobile Test Selection
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, BookOpen, Microscope, Beaker, Atom, Clock } from 'lucide-react';

const TestSelection = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTestType, setSelectedTestType] = useState('subject');

  const subjects = [
    { name: 'Mathematics', icon: Calculator },
    { name: 'English', icon: BookOpen },
    { name: 'Biology', icon: Microscope },
    { name: 'Chemistry', icon: Beaker },
    { name: 'Physics', icon: Atom }
  ];

  const testTypes = [
    { id: 'quick', name: 'Quick Practice', details: '20 questions, 30 mins' },
    { id: 'subject', name: 'Subject Test', details: '40 questions, 60 mins' },
    { id: 'mock', name: 'Mock Exam', details: 'Full test, 3 hours' }
  ];

  const handleStartTest = () => {
    // Store selections in sessionStorage for TestInterface to use
    sessionStorage.setItem('selectedSubject', selectedSubject);
    sessionStorage.setItem('selectedTestType', selectedTestType);
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Select Test</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8 max-w-md mx-auto">
        {/* Choose Subject */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose Subject</h2>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              const isSelected = selectedSubject === subject.name;
              
              return (
                <button
                  key={subject.name}
                  onClick={() => setSelectedSubject(subject.name)}
                  className={`p-5 rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-sky-100 border-2 border-sky-500 shadow-md' 
                      : 'bg-sky-50 border-2 border-transparent shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-sky-500' : 'bg-sky-200'
                    }`}>
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-sky-600'}`} />
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? 'text-sky-700' : 'text-gray-700'}`}>
                      {subject.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Test Type */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test Type</h2>
          <div className="space-y-3">
            {testTypes.map((type) => {
              const isSelected = selectedTestType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedTestType(type.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected 
                      ? 'bg-sky-50 border-sky-500 shadow-md' 
                      : 'bg-white border-gray-200 hover:border-sky-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-sky-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-sky-500" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{type.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{type.details}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Tip:</span> Start with Quick Practice to warm up, 
            then move to Subject Tests for deeper preparation.
          </p>
        </div>

        {/* Start Test Button */}
        <button 
          onClick={handleStartTest}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition-colors"
        >
          Start Test
        </button>

        {/* Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            You're about to start a <span className="font-semibold text-gray-800">
              {testTypes.find(t => t.id === selectedTestType)?.name}
            </span> for <span className="font-semibold text-gray-800">{selectedSubject}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default TestSelection;