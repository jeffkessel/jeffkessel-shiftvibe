import React from 'react';

interface FiltersProps {
  options: {
    locations: string[];
    departments: string[];
    roles: string[];
  };
  currentFilters: {
    location: string;
    department: string;
    role: string;
  };
  onFilterChange: (filterType: 'location' | 'department' | 'role', value: string) => void;
}

const FilterDropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, options, onChange }) => (
  <div>
    <label htmlFor={label} className="block text-sm font-medium text-slate-300 mb-1">
      {label}
    </label>
    <select
      id={label}
      name={label}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-slate-600 bg-slate-700 py-2 pl-3 pr-10 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const Filters: React.FC<FiltersProps> = ({ options, onFilterChange, currentFilters }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-white">Filters</h3>
      <FilterDropdown 
        label="Location"
        value={currentFilters.location}
        options={options.locations}
        onChange={(e) => onFilterChange('location', e.target.value)}
      />
      <FilterDropdown 
        label="Department"
        value={currentFilters.department}
        options={options.departments}
        onChange={(e) => onFilterChange('department', e.target.value)}
      />
      <FilterDropdown 
        label="Job Role"
        value={currentFilters.role}
        options={options.roles}
        onChange={(e) => onFilterChange('role', e.target.value)}
      />
    </div>
  );
};

export default Filters;