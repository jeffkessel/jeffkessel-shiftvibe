import React from 'react';
import { Employee, JobRole } from '../lib/mockData';

interface EmployeeManagementProps {
    employees: Employee[];
    jobRoles: JobRole[];
    onAddClick: () => void;
    onEditClick: (employee: Employee) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ employees, jobRoles, onAddClick, onEditClick }) => {
    
    const getJobRoleNames = (employee: Employee): string => {
        return employee.jobRoleIds
            .map(id => jobRoles.find(r => r.id === id)?.name)
            .filter(Boolean)
            .join(', ') || 'N/A';
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">All Employees</h2>
                <button
                    onClick={onAddClick}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Add Employee
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Permission</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Job Roles</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Location</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-medium text-white">{employee.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{employee.permissionRole}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{getJobRoleNames(employee)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{employee.location}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button onClick={() => onEditClick(employee)} className="text-indigo-400 hover:text-indigo-300">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManagement;