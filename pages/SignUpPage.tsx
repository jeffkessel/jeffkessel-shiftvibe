
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import RoleSelector from '../components/RoleSelector';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Sign up attempt:', { name, email, password, role });
    // TODO: Integrate Clerk sign-up logic here
    alert('Sign-up form submitted! Check the console for the data. This is a placeholder.');
  };

  return (
    <AuthForm
      title="Create Your Account"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      footerContent={
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <NavLink to="/auth/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Log In
          </NavLink>
        </p>
      }
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

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
        <label htmlFor="password" className="block text-sm font-medium text-slate-300">
          Password
        </label>
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

      <RoleSelector role={role} setRole={setRole} />

    </AuthForm>
  );
};

export default SignUpPage;
