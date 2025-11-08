"use client";
import React from 'react';
import PricingCard from '@/components/PricingCard';

const Feature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 rounded-lg">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mb-4">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
);


const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* Hero Section */}
      <section className="text-center">
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900 rounded-full blur-3xl opacity-50"></div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Manage Shifts, <span className="block sm:inline text-indigo-400">Vibe Higher.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
            ShiftVibe is the ultimate solution for effortless employee scheduling, communication, and collaboration. Get started for free.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="w-full sm:w-auto rounded-lg bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
              Get Started
            </a>
            <a href="#features" className="w-full sm:w-auto rounded-lg bg-slate-700 px-8 py-3 text-base font-medium text-white hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why ShiftVibe?</h2>
            <p className="mt-4 text-lg text-slate-400">Everything you need to streamline your workforce management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              title="Smart Scheduling"
              description="Create, manage, and distribute schedules in minutes with our intuitive drag-and-drop interface."
            />
            <Feature 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z" /></svg>}
              title="Team Communication"
              description="Keep everyone in the loop with built-in messaging, announcements, and shift reminders."
            />
            <Feature 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Time Tracking"
              description="Accurate time clocks and automated timesheets to simplify payroll and ensure compliance."
            />
          </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Choose Your Plan</h2>
            <p className="mt-4 text-lg text-slate-400">Start for free, then grow with us. Simple, transparent pricing.</p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PricingCard 
            tier="Free"
            price="$0"
            period="/month"
            features={['Up to 10 users', 'Basic scheduling', 'Mobile app access', 'Email support']}
            buttonText="Get Started"
          />
          <PricingCard 
            tier="Standard"
            price="$8"
            period="/user/month"
            features={['Everything in Free, plus:', 'Unlimited users', 'Time tracking', 'Advanced reporting', 'Priority support']}
            buttonText="Choose Standard"
            highlight
          />
          <PricingCard 
            tier="Premium"
            price="$15"
            period="/user/month"
            features={['Everything in Standard, plus:', 'API access', 'Dedicated account manager', 'Custom integrations', '24/7 phone support']}
            buttonText="Contact Sales"
          />
        </div>
         <p className="text-center mt-8 text-sm text-slate-500">
            README note: Stripe subscription integration placeholder here. Buttons are not yet functional.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
