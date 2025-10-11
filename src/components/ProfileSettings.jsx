// components/ProfileSettings.jsx - Student Profile & Settings
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, School, Lock, Bell, CreditCard, LogOut, Edit2, Check, X } from 'lucide-react';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Ada Okonkwo',
    email: 'ada.okonkwo@email.com',
    phone: '+234 803 456 7890',
    school: 'Government Secondary School, Ibadan',
    class: 'SS3'
  });
  const [tempProfileData, setTempProfileData] = useState({ ...profileData });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    testReminders: true,
    weeklyReports: true,
    performanceAlerts: true
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfileData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempProfileData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempProfileData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempProfileData({
      ...tempProfileData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Profile & Settings</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4 text-center">
          <div className="w-24 h-24 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-sky-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profileData.fullName}</h2>
          <p className="text-sm text-gray-600">{profileData.class} Student</p>
          <button className="mt-3 text-sm text-sky-600 font-medium hover:text-sky-700">
            Change Photo
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-4 flex gap-1">
          {['profile', 'notifications', 'security', 'subscription'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-sky-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleCancel}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleSave}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={tempProfileData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.fullName}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempProfileData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tempProfileData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <School className="w-4 h-4" />
                  School
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="school"
                    value={tempProfileData.school}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.school}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                {isEditing ? (
                  <select
                    name="class"
                    value={tempProfileData.class}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="SS1">SS1</option>
                    <option value="SS2">SS2</option>
                    <option value="SS3">SS3</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profileData.class}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {Object.keys(notifications).map((key) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-gray-600">
                      {key === 'emailNotifications' && 'Receive notifications via email'}
                      {key === 'smsNotifications' && 'Receive SMS notifications'}
                      {key === 'testReminders' && 'Get reminders before scheduled tests'}
                      {key === 'weeklyReports' && 'Weekly performance summary'}
                      {key === 'performanceAlerts' && 'Alerts for significant score changes'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[key] ? 'bg-sky-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/change-password')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your password</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Last password change:</span> 30 days ago
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
            
            <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-sky-900">Current Plan</span>
                <span className="px-3 py-1 bg-sky-500 text-white rounded-full text-xs font-semibold">
                  PREMIUM
                </span>
              </div>
              <p className="text-2xl font-bold text-sky-900 mb-1">₦2,500/month</p>
              <p className="text-sm text-sky-700">Unlimited tests, AI feedback, full analytics</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Renewal Date</span>
                <span className="text-sm font-semibold text-gray-900">Nov 15, 2025</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-semibold text-gray-900">Card ending in 4242</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-sky-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Change Plan</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full p-4 text-red-600 border-2 border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;