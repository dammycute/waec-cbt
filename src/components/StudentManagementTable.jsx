import React, { useState } from 'react';
import { Search, Upload, Plus, Download, MoreVertical, ArrowLeft, X, Check } from 'lucide-react';

const StudentManagementTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', class: 'SS3', email: 'john@example.com', tests: 10, avgScore: 75, status: 'Active' },
    { id: 2, name: 'Jane Smith', class: 'SS3', email: 'jane@example.com', tests: 12, avgScore: 82, status: 'Active' },
    { id: 3, name: 'Michael Johnson', class: 'SS2', email: 'michael@example.com', tests: 8, avgScore: 68, status: 'Active' },
    { id: 4, name: 'Sarah Williams', class: 'SS3', email: 'sarah@example.com', tests: 15, avgScore: 92, status: 'Active' },
    { id: 5, name: 'David Brown', class: 'SS1', email: 'david@example.com', tests: 6, avgScore: 70, status: 'Inactive' },
    { id: 6, name: 'Emily Davis', class: 'SS3', email: 'emily@example.com', tests: 11, avgScore: 85, status: 'Active' },
    { id: 7, name: 'Mark Wilson', class: 'SS2', email: 'mark@example.com', tests: 5, avgScore: 45, status: 'Active' },
    { id: 8, name: 'Lisa Anderson', class: 'SS3', email: 'lisa@example.com', tests: 9, avgScore: 78, status: 'Active' }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    class: 'SS1',
    phone: '',
    password: ''
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = {
      id: students.length + 1,
      name: newStudent.name,
      class: newStudent.class,
      email: newStudent.email,
      tests: 0,
      avgScore: 0,
      status: 'Active'
    };
    setStudents([...students, student]);
    setShowAddModal(false);
    setNewStudent({ name: '', email: '', class: 'SS1', phone: '', password: '' });
    alert('Student added successfully!');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        alert('Please select a CSV file');
      }
    }
  };

  const handleUploadCSV = () => {
    if (!selectedFile) {
      alert('Please select a CSV file first');
      return;
    }
    alert(`Processing ${selectedFile.name}... Students will be imported from CSV.`);
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Class', 'Email', 'Tests Taken', 'Avg Score', 'Status'],
      ...students.map(s => [s.name, s.class, s.email, s.tests, s.avgScore, s.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  const downloadTemplate = () => {
    const csvContent = "Name,Email,Class,Phone,Password\nJohn Doe,john@example.com,SS3,+234XXXXXXXXX,password123";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_template.csv';
    a.click();
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const AddStudentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
          <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="student@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={newStudent.phone}
              onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="+234 XXX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={newStudent.class}
              onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="SS1">SS1</option>
              <option value="SS2">SS2</option>
              <option value="SS3">SS3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Initial Password</label>
            <input
              type="password"
              required
              value={newStudent.password}
              onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Set initial password"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UploadCSVModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Students CSV</h2>
          <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer text-sky-600 hover:text-sky-700 font-medium"
            >
              Choose CSV file
            </label>
            <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
            {selectedFile && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>CSV Format:</strong>
            </p>
            <p className="text-xs text-blue-700 font-mono">
              Name, Email, Class, Phone, Password
            </p>
          </div>

          <button
            onClick={downloadTemplate}
            className="w-full text-sky-600 hover:text-sky-700 font-medium text-sm"
          >
            Download CSV Template
          </button>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowUploadModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadCSV}
              className="flex-1 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50"
              >
                <Upload className="w-5 h-5" />
                Upload CSV
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600"
              >
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">Filter by Class: All</option>
            <option value="SS1">SS1</option>
            <option value="SS2">SS2</option>
            <option value="SS3">SS3</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Download className="w-5 h-5" />
            Export List
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tests Taken</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{student.class}</td>
                  <td className="px-6 py-4 text-gray-700">{student.email}</td>
                  <td className="px-6 py-4 text-gray-700">{student.tests}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      student.avgScore >= 75 ? 'text-green-600' :
                      student.avgScore >= 60 ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {filteredStudents.length} students</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {showAddModal && <AddStudentModal />}
      {showUploadModal && <UploadCSVModal />}
    </div>
  );
};

export default StudentManagementTable;