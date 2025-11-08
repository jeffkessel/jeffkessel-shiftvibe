import React, { useState, useEffect } from 'react';
import { Employee, JobRole } from '../lib/mockData';
import MultiSelectDropdown from './MultiSelectDropdown';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: Employee;
    allJobRoles: JobRole[];
    onSave: (updates: Partial<Pick<Employee, 'name' | 'location' | 'jobRoleIds'>>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, allJobRoles, onSave }) => {
    const [name, setName] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [selectedJobRoleIds, setSelectedJobRoleIds] = useState<number[]>(user.jobRoleIds);
    
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setLocation(user.location);
            setSelectedJobRoleIds(user.jobRoleIds);
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave({
            name,
            location,
            jobRoleIds: selectedJobRoleIds
        });
        setIsSaving(false);
    };
    
    const locationOptions = ['Downtown', 'Uptown', 'Corporate'];
    const jobRoleOptions = allJobRoles.map(role => ({ value: role.id, label: role.name }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
                        <p className="text-sm text-slate-400 mt-1">Make changes to your profile information.</p>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
                            </div>
                           
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-300">Location</label>
                                <select name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required>
                                    {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                             <div>
                                <label className="block text-sm font-medium text-slate-300">Job Roles</label>
                                <MultiSelectDropdown
                                    options={jobRoleOptions}
                                    selectedValues={selectedJobRoleIds}
                                    onChange={setSelectedJobRoleIds}
                                    placeholder="Select job roles..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 px-6 py-4 flex justify-end items-center gap-3 border-t border-slate-700">
                        <button type="button" onClick={onClose} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSaving} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;