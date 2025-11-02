// src/App.jsx - Complete Application Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Authentication
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ForgotPassword from './components/ForgotPassword';

// Student Routes
import StudentDashboard from './components/StudentDashboard';
import TestSelection from './components/TestSelection';
import TestInterface from './components/TestInterface';
import TestResults from './components/TestResults';
import QuestionReview from './components/QuestionReview';
import StudentAnalytics from './components/StudentAnalytics';
import ProfileSettings from './components/ProfileSettings';
import ChangePassword from './components/ChangePassword';

// School Admin Routes
import SchoolAdminDashboard from './components/SchoolAdminDashboard';
import StudentManagementTable from './components/StudentManagementTable';
import ClassPerformanceView from './components/ClassPerformanceView';
import IndividualStudentView from './components/IndividualStudentView';
import TestScheduling from './components/TestScheduling';

// Public Routes
import HomepageHero from './components/HomepageHero';
import PricingCards from './components/PricingCards';
import AboutUs from './components/AboutUs';
import NotFound from './components/NotFound';

import './App.css';
import Portfolio from './components/portfolio';
import SubjectManagement from './components/SubjectManagement';
import QuestionManagement from './components/questionManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomepageHero />} />
          <Route path="/pricing" element={<PricingCards />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/test-selection" element={<TestSelection />} />
          <Route path="/test" element={<TestInterface />} />
          <Route path="/test-results" element={<TestResults />} />
          <Route path="/question-review" element={<QuestionReview />} />
          <Route path="/analytics" element={<StudentAnalytics />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/portfolio" element={< Portfolio/>} />
          
          {/* School Admin Routes */}
          <Route path="/admin-dashboard" element={<SchoolAdminDashboard />} />
          <Route path="/student-management" element={<StudentManagementTable />} />
          <Route path="/class-performance" element={<ClassPerformanceView />} />
          <Route path="/student/:id" element={<IndividualStudentView />} />
          <Route path="/test-scheduling" element={<TestScheduling />} />
          <Route path="/create-subject" element={<SubjectManagement />} />
          <Route path="/create-questions" element={<QuestionManagement />} />

          
          {/* 404 Page */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;