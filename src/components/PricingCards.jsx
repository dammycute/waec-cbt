// components/PricingCards.jsx - Pricing Page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingCards = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'FREE',
      price: '₦0',
      period: '/month',
      badge: null,
      features: [
        '5 practice tests per month',
        'Basic performance tracking',
        'Mobile access',
        'Email support',
        'Access to 5 subjects'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border-2 border-sky-500 text-sky-600 hover:bg-sky-50',
      popular: false
    },
    {
      name: 'PREMIUM',
      price: '₦2,500',
      period: '/month',
      badge: 'Most Popular',
      features: [
        'Unlimited practice tests',
        'AI-powered feedback',
        'Detailed analytics',
        'Study recommendations',
        'Priority support',
        'All subjects available',
        'Progress tracking',
        'Download reports'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-sky-500 text-white hover:bg-sky-600',
      popular: true
    },
    {
      name: 'SCHOOL',
      price: 'From ₦50,000',
      period: '/term',
      badge: 'For Schools',
      features: [
        'Bulk student accounts',
        'Teacher dashboard',
        'Class management',
        'Detailed reports',
        'Student analytics',
        'Custom branding',
        'Dedicated support',
        'Training sessions'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-sky-500 text-sky-600 hover:bg-sky-50',
      popular: false
    }
  ];

  const handleButtonClick = (plan) => {
    if (plan.name === 'SCHOOL') {
      alert('Contact us at schools@waecpractice.com or call +234 XXX XXX XXXX');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">Start preparing for WAEC success today</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg p-8 relative ${
              plan.popular ? 'ring-2 ring-sky-500 transform scale-105' : ''
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan Name */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {plan.name}
            </h2>

            {/* Price */}
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-600">{plan.period}</span>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleButtonClick(plan)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept bank transfers, card payments via Paystack, and mobile money transfers.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
              How many students can use a School plan?
            </h3>
            <p className="text-gray-600">
              School plans are flexible. Contact us for custom pricing based on your student count.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/')}
          className="text-sky-600 hover:text-sky-700 font-medium"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default PricingCards;