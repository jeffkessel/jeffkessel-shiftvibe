
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} ShiftVibe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About</a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
