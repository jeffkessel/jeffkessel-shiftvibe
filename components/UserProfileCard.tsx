import React from 'react';
import { Employee, JobRole } from '../lib/mockData';

interface UserProfileCardProps {
    user: Employee;
    jobRoles: JobRole[];
    onEditClick: () => void;
}

const InfoPill: React.FC<{ value: string; icon: React.ReactNode }> = ({ value, icon }) => (
    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-full px-3 py-1 text-sm">
        <div className="text-indigo-400">{icon}</div>
        <span className="font-medium text-white">{value}</span>
    </div>
);

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, jobRoles, onEditClick }) => {
    const userJobRoles = user.jobRoleIds
      .map(id => jobRoles.find(r => r.id === id)?.name)
      .filter(Boolean) as string[];

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img className="h-24 w-24 rounded-full ring-4 ring-slate-700" src={user.avatar} alt={`${user.name}'s avatar`} />
            <div className="flex-grow text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="font-medium text-indigo-400">{user.permissionRole}</p>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    <InfoPill 
                        value={user.location}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    />
                    {userJobRoles.map(roleName => (
                         <InfoPill 
                            key={roleName}
                            value={roleName}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={onEditClick}
                    className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfileCard;