// components/HomepageHero.jsx - Desktop Homepage Hero (#13)
import React from 'react';

const HomepageHero = () => {
  return (
    <div className="flex min-h-[600px] bg-white" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">Ace Your WAEC Exams with AI-Powered Practice</h1>
        <p className="text-xl mb-6">Practice in real CBT environment. Get instant feedback. Improve your scores.</p>
        <div className="space-x-4 mb-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded">Start Free Trial</button>
          <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded">For Schools</button>
        </div>
        <p>Join 5,000+ students</p>
      </div>
      <div className="w-1/2 bg-gray-200">
        {/* Hero image placeholder */}
        Image of student
      </div>
    </div>
  );
};

export default HomepageHero;