// App.js - Main entry point for the React app
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import StudentDashboard from './components/StudentDashboard';
import TestSelection from './components/TestSelection';
import TestInterface from './components/TestInterface';
import QuestionNavigatorModal from './components/QuestionNavigatorModal';
import TestResults from './components/TestResults';
import QuestionReview from './components/QuestionReview';
import StudentAnalytics from './components/StudentAnalytics';
import SchoolAdminDashboard from './components/SchoolAdminDashboard';
import StudentManagementTable from './components/StudentManagementTable';
import ClassPerformanceView from './components/ClassPerformanceView';
import HomepageHero from './components/HomepageHero';
import PricingCards from './components/PricingCards';
import BottomNavigation from './components/BottomNavigation';
import './App.css'; // Global styles, assume Tailwind is set up

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/test-selection" element={<TestSelection />} />
          <Route path="/test" element={<TestInterface />} />
          <Route path="/test-results" element={<TestResults />} />
          <Route path="/question-review" element={<QuestionReview />} />
          <Route path="/analytics" element={<StudentAnalytics />} />
          <Route path="/admin-dashboard" element={<SchoolAdminDashboard />} />
          <Route path="/student-management" element={<StudentManagementTable />} />
          <Route path="/class-performance" element={<ClassPerformanceView />} />
          <Route path="/" element={<HomepageHero />} />
          <Route path="/pricing" element={<PricingCards />} />
          {/* Add more routes as needed */}
        </Routes>
        {/* BottomNavigation can be conditionally rendered for mobile routes */}
      </div>
    </Router>
  );
}

export default App;