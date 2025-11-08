import React from 'react';
import { JobRole } from '../lib/mockData';

interface JobRoleManagementProps {
    jobRoles: JobRole[];
    onAddClick: () => void;
    onEditClick: (role: JobRole) => void;
    onDeleteClick: (roleId: number) => void;
}

const JobRoleManagement: React.FC<JobRoleManagementProps> = ({ jobRoles, onAddClick, onEditClick, onDeleteClick }) => {
    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Job Roles</h2>
                <button
                    onClick={onAddClick}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Add Job Role
                </button>
            </div>
            <div className="mt-4 flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <ul role="list" className="divide-y divide-slate-700">
                            {jobRoles.map((role) => (
                                <li key={role.id} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold leading-6 text-white">{role.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-slate-400">{role.department}</p>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <button onClick={() => onEditClick(role)} className="rounded-md bg-slate-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600">
                                            Edit
                                        </button>
                                         <button onClick={() => onDeleteClick(role.id)} className="rounded-md bg-red-800/80 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobRoleManagement;