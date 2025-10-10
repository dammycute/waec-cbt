// components/PricingCards.jsx - Desktop Pricing (#14)
import React from 'react';

const PricingCards = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold">FREE</h2>
        <p className="text-3xl">₦0/month</p>
        <ul className="my-4 space-y-2">
          <li>✔ 5 practice tests per month</li>
          {/* More */}
        </ul>
        <button className="w-full border px-4 py-2 rounded">Get Started</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow relative">
        <span className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-bl">Most Popular</span>
        <h2 className="text-xl font-bold">PREMIUM</h2>
        <p className="text-3xl">₦2,500/month</p>
        <ul className="my-4 space-y-2">
          <li>✔ Unlimited practice tests</li>
          {/* More */}
        </ul>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded">Start Free Trial</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold">SCHOOL</h2>
        <p className="text-3xl">From ₦50,000/term</p>
        <ul className="my-4 space-y-2">
          <li>✔ Bulk student accounts</li>
          {/* More */}
        </ul>
        <button className="w-full border px-4 py-2 rounded">Contact Sales</button>
      </div>
    </div>
  );
};

export default PricingCards;