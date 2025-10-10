// components/StudentManagementTable.jsx - Desktop Student Management (#9)
import React from 'react';

const StudentManagementTable = () => {
  return (
    <div className="p-4" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <header className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Student Management</h1>
        <div className="space-x-2">
          <input type="search" placeholder="Search" className="p-2 border rounded" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
          <button className="border px-4 py-2 rounded">Upload CSV</button>
        </div>
      </header>
      <div className="flex space-x-4 mb-2">
        <select className="p-2 border rounded">Filter by Class: All</select>
        <select className="p-2 border rounded">Status: All</select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>Tests Taken</th>
            <th>Avg Score</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample rows */}
          <tr className="border-b">
            <td><input type="checkbox" /></td>
            <td>John Doe</td>
            <td>SS3</td>
            <td>john@example.com</td>
            <td>10</td>
            <td>75%</td>
            <td><span className="bg-green-200 px-2 rounded">Active</span></td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">Showing 1-20 of 247 students</div>
    </div>
  );
};

export default StudentManagementTable;