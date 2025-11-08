
import React from 'react';

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  buttonText: string;
  footerContent: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, children, buttonText, footerContent }) => {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <div className="mt-2 text-center text-sm text-slate-400">
            {footerContent}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-slate-800 px-4 py-8 shadow-lg sm:px-10 border border-slate-700">
          <form className="space-y-6" onSubmit={onSubmit}>
            {children}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
