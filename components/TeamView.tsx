import React from 'react';
import { Employee, JobRole } from '../lib/mockData';

interface TeamViewProps {
    team: Employee[];
    jobRoles: JobRole[];
}

const TeamView: React.FC<TeamViewProps> = ({ team, jobRoles }) => {
    
    const getPrimaryJobRoleName = (employee: Employee): string => {
        if (employee.jobRoleIds.length === 0) return employee.permissionRole;
        const primaryRole = jobRoles.find(r => r.id === employee.jobRoleIds[0]);
        return primaryRole ? primaryRole.name : 'Unknown Role';
    }

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-white mb-4">My Team</h3>
            <div className="space-y-3">
                {team.map(member => (
                    <div key={member.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
                        <div className="flex items-center space-x-3">
                            <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                            <div>
                                <p className="font-semibold text-white">{member.name}</p>
                                <p className="text-sm text-slate-400">{getPrimaryJobRoleName(member)}</p>
                            </div>
                        </div>
                        <button 
                            className="text-sm text-indigo-400 hover:text-indigo-300"
                            onClick={() => alert(`Viewing profile for ${member.name}. (Placeholder)`)}
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamView;