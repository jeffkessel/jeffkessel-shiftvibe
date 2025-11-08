import React from 'react';
import { Employee, Shift, JobRole } from '../lib/mockData';
import ShiftCell from './ShiftCell';

interface ScheduleGridProps {
  employees: Employee[];
  shifts: Shift[];
  jobRoles: JobRole[];
  onPublish: () => void;
}

const getWeekDays = (): Date[] => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    // Adjust to make Monday the first day (1=Mon, ..., 0=Sun)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
    });
};

const weekDates = getWeekDays();
const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const dateFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric' });


const ScheduleGrid: React.FC<ScheduleGridProps> = ({ employees, shifts, jobRoles, onPublish }) => {
  const draftShiftsCount = shifts.filter(s => s.status === 'draft').length;

  const getPrimaryJobRoleName = (employee: Employee): string => {
    if (employee.jobRoleIds.length === 0) return 'No Role';
    const primaryRole = jobRoles.find(r => r.id === employee.jobRoleIds[0]);
    return primaryRole ? primaryRole.name : 'Unknown Role';
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Weekly Schedule</h2>
          <p className="text-sm text-slate-400">
            {/* TODO: AI-powered summary can go here */}
            {draftShiftsCount > 0 
              ? `${draftShiftsCount} draft shift${draftShiftsCount > 1 ? 's' : ''} need publishing.`
              : 'All shifts are published.'
            }
          </p>
        </div>
        <button
          onClick={onPublish}
          disabled={draftShiftsCount === 0}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Publish All Drafts
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Grid Header */}
          <div className="grid grid-cols-[200px_repeat(7,1fr)] sticky top-0 bg-slate-800 z-10">
            <div className="p-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-r border-slate-700">Employee</div>
            {weekDates.map(date => (
              <div key={date.toISOString()} className="p-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-700">
                <div>{dayFormatter.format(date)}</div>
                <div className="font-bold text-base text-slate-300">{dateFormatter.format(date)}</div>
              </div>
            ))}
          </div>

          {/* Grid Body */}
          {/* TODO: AI-powered scheduling suggestions could highlight optimal empty slots */}
          <div className="divide-y divide-slate-700">
            {employees.length > 0 ? employees.map(employee => {
              const employeeShifts = shifts.filter(s => s.employeeId === employee.id);
              const primaryJobRole = getPrimaryJobRoleName(employee);
              return (
                <div key={employee.id} className="grid grid-cols-[200px_repeat(7,1fr)]">
                  {/* Employee Info Cell */}
                  <div className="p-3 border-r border-slate-700 flex items-center">
                      <img className="h-8 w-8 rounded-full" src={employee.avatar} alt={employee.name} />
                      <div className="ml-3 truncate">
                        <div className="text-sm font-medium text-white truncate">{employee.name}</div>
                        <div className="text-xs text-slate-400 truncate">{primaryJobRole}</div>
                      </div>
                  </div>
                  {/* Shift Cells for the week */}
                  {/* TODO: Implement drag-and-drop for moving shifts between cells */}
                  {weekDates.map(date => {
                    const shift = employeeShifts.find(s => 
                      s.startTime.getFullYear() === date.getFullYear() &&
                      s.startTime.getMonth() === date.getMonth() &&
                      s.startTime.getDate() === date.getDate()
                    );
                    return (
                      <div key={date.toISOString()} className="p-2 border-r border-slate-700 last:border-r-0 h-24">
                        {shift ? <ShiftCell shift={shift} roleName={primaryJobRole} /> : null}
                      </div>
                    );
                  })}
                </div>
              );
            }) : (
              <div className="text-center py-10 text-slate-400 col-span-8">
                No employees match the current filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;