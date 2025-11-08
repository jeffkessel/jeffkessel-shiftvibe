"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Filters from '@/components/Filters';
import ScheduleGrid from '@/components/ScheduleGrid';
import { Employee, Shift, JobRole } from '@/lib/mockData';
import { getScheduleData, publishShifts } from '@/services/api';

export default function DashboardPage() {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [filterOptions, setFilterOptions] = useState({ locations: [], departments: [], roles: [] });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    location: 'All',
    department: 'All',
    role: 'All',
  });
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { employees, shifts, jobRoles, filterOptions } = await getScheduleData();
      setAllEmployees(employees);
      setShifts(shifts);
      setJobRoles(jobRoles);
      setFilterOptions(filterOptions);
    } catch (err) {
      setError('Failed to load schedule data. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter(employee => {
      const locationMatch = filters.location === 'All' || employee.location === filters.location;
      
      const employeeDepartments = new Set(employee.jobRoleIds.map(id => jobRoles.find(r => r.id === id)?.department));
      const departmentMatch = filters.department === 'All' || employeeDepartments.has(filters.department as JobRole['department']);
      
      const employeeJobRoleNames = new Set(employee.jobRoleIds.map(id => jobRoles.find(r => r.id === id)?.name));
      const roleMatch = filters.role === 'All' || employeeJobRoleNames.has(filters.role);

      return locationMatch && departmentMatch && roleMatch;
    });
  }, [filters, allEmployees, jobRoles]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handlePublish = async () => {
    console.log('Publishing all draft shifts...');
    try {
      await publishShifts();
      alert('All draft shifts have been published!');
      fetchData(); 
    } catch (e) {
      alert('Failed to publish shifts.');
    }
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><div className="text-xl text-slate-400">Loading Schedule...</div></div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center h-full"><div className="text-xl text-red-400">{error}</div></div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <aside className="lg:w-1/4 xl:w-1/5">
        <Filters 
            options={filterOptions}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
        />
      </aside>
      <main className="flex-1 min-w-0">
        <ScheduleGrid 
          employees={filteredEmployees} 
          shifts={shifts}
          jobRoles={jobRoles}
          onPublish={handlePublish}
        />
      </main>
    </div>
  );
};
