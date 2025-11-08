
import React from 'react';

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, price, period, features, buttonText, highlight = false }) => {
  const cardClasses = `flex flex-col p-6 mx-auto max-w-lg text-center text-slate-300 bg-slate-800 rounded-lg border border-slate-700 shadow-lg transition-transform transform hover:scale-105 duration-300 ${highlight ? 'border-indigo-500 scale-105' : ''}`;
  const buttonClasses = `font-medium rounded-lg text-sm px-5 py-2.5 text-center ${highlight ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-900' : 'text-white bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:ring-slate-800'}`;

  return (
    <div className={cardClasses}>
      <h3 className="mb-4 text-2xl font-semibold text-white">{tier}</h3>
      <p className="font-light text-slate-400 sm:text-lg">Perfect for {tier === 'Free' ? 'individuals and small teams' : tier === 'Standard' ? 'growing businesses' : 'large enterprises'}.</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold text-white">{price}</span>
        <span className="text-slate-400">{period}</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg className={`flex-shrink-0 w-5 h-5 ${highlight ? 'text-indigo-400' : 'text-green-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          // TODO: Add Stripe integration logic here
          // Note: Stripe subscription integration placeholder here
          console.log(`Subscribing to ${tier} tier`);
        }}
        className={buttonClasses}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
