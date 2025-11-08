"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }
    console.log('Login attempt:', { email, password });
    // TODO: Integrate Clerk login logic here
    alert('Login form submitted! Check the console for the data. This is a placeholder.');
  };

  return (
    <AuthForm
      title="Log In to ShiftVibe"
      buttonText="Log In"
      onSubmit={handleSubmit}
      footerContent={
        <p className="text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign Up
          </Link>
        </p>
      }
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Password
          </label>
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </AuthForm>
  );
};
