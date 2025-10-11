// components/AboutUs.jsx - About Us Page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Users, Target, Award } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Mr. Oladele Akinwumi',
      role: 'Founder & CEO',
      bio: 'Former WAEC examiner with 15+ years of experience in education technology.'
    },
    {
      name: 'Dr. Chioma Nwosu',
      role: 'Head of Content',
      bio: 'PhD in Education, specializes in curriculum development and assessment.'
    },
    {
      name: 'Eng. Tunde Bakare',
      role: 'CTO',
      bio: 'Software engineer passionate about building accessible education tools.'
    },
    {
      name: 'Mrs. Fatima Ibrahim',
      role: 'Head of Operations',
      bio: 'Education administrator with extensive school management experience.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower every Nigerian student with world-class WAEC preparation tools, making quality education accessible to all.'
    },
    {
      icon: Award,
      title: 'Our Vision',
      description: 'To become the leading educational technology platform for West African examinations, helping thousands of students achieve their dreams.'
    },
    {
      icon: Users,
      title: 'Our Values',
      description: 'Excellence, accessibility, innovation, and student success drive everything we do.'
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Students' },
    { number: '50+', label: 'Schools' },
    { number: '10,000+', label: 'Tests Taken' },
    { number: '85%', label: 'Pass Rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About WAEC CBT Practice</h1>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto">
            We're on a mission to help every Nigerian student excel in their WAEC examinations 
            through innovative, AI-powered practice tools.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-sky-600 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              WAEC CBT Practice was founded in 2023 with a simple but powerful vision: to democratize 
              access to quality WAEC preparation tools for every Nigerian student, regardless of their 
              location or economic background.
            </p>
            <p className="mb-4">
              Our founder, a former WAEC examiner, witnessed firsthand the gap between students who had 
              access to CBT practice facilities and those who didn't. This disparity in preparation often 
              translated to differences in exam performance.
            </p>
            <p className="mb-4">
              Starting in Ibadan, Oyo State, we began with just 5 pilot schools and 200 students. Today, 
              we're proud to serve over 5,000 students across Nigeria, with partnerships in 50+ schools 
              and tutorial centers.
            </p>
            <p>
              Our AI-powered platform has helped thousands of students improve their scores, gain confidence, 
              and achieve their educational dreams. We're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            A dedicated group of educators, technologists, and innovators committed to student success
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-24 h-24 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-sky-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-sky-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-sm text-gray-600">support@waeccbt.com</p>
              <p className="text-sm text-gray-600">schools@waeccbt.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600">+234 803 456 7890</p>
              <p className="text-sm text-gray-600">Mon-Fri: 8AM - 6PM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">123 Education Avenue</p>
              <p className="text-sm text-gray-600">Ibadan, Oyo State</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of students who are already improving their WAEC scores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;