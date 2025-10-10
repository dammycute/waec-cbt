// components/SchoolAdminDashboard.jsx - Desktop Admin Dashboard (#8)
import React from 'react';

const SchoolAdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-white" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <aside className="w-1/4 bg-gray-100 p-4">
        <ul className="space-y-4">
          <li className="font-bold">Dashboard</li>
          <li>Student Management</li>
          {/* More nav */}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <header className="flex justify-between mb-4">
          <h1>Welcome, Mr. Okafor - Bright Future Academy</h1>
          <div>Avatar</div>
        </header>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">Total Students: 247</div>
          {/* More stats */}
        </div>
        <section>
          <h2>Recent Activity</h2>
          {/* List */}
        </section>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2">Add Students</button>
          {/* More buttons */}
        </div>
      </main>
      <aside className="w-1/4 p-4 bg-gray-100">
        {/* Right sidebar content */}
      </aside>
    </div>
  );
};

export default SchoolAdminDashboard;