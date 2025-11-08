
import React from 'react';

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ role, setRole }) => {
  return (
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-slate-300">
        Your Role
      </label>
      <div className="mt-1">
        <select
          id="role"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option>Owner</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>
      </div>
    </div>
  );
};

export default RoleSelector;
