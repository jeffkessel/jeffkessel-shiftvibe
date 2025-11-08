import React, { useState, useEffect } from 'react';
import { Employee, JobRole } from '@/lib/mockData';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';

interface EmployeeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Employee, 'id' | 'avatar' | 'companyId'>) => void;
    employee: Employee | null;
    allJobRoles: JobRole[];
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, onSave, employee, allJobRoles }) => {
    const [name, setName] = useState('');
    const [permissionRole, setPermissionRole] = useState<Employee['permissionRole']>('Employee');
    const [location, setLocation] = useState<Employee['location']>('Downtown');
    const [selectedJobRoleIds, setSelectedJobRoleIds] = useState<number[]>([]);
    
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setPermissionRole(employee.permissionRole);
            setLocation(employee.location);
            setSelectedJobRoleIds(employee.jobRoleIds);
        } else {
            // Reset for new employee
            setName('');
            setPermissionRole('Employee');
            setLocation('Downtown');
            setSelectedJobRoleIds([]);
        }
    }, [employee, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave({
            name,
            permissionRole,
            location,
            jobRoleIds: selectedJobRoleIds,
        });
        setIsSaving(false);
    };
    
    const locationOptions: Employee['location'][] = ['Downtown', 'Uptown', 'Corporate'];
    const permissionRoleOptions: Employee['permissionRole'][] = ['Owner', 'Manager', 'Employee'];
    const jobRoleOptions = allJobRoles.map(role => ({ value: role.id, label: role.name }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">{employee ? 'Edit Employee' : 'Add Employee'}</h3>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" required />
                            </div>
                            
                            <div>
                                <label htmlFor="permissionRole" className="block text-sm font-medium text-slate-300">Permission Role</label>
                                <select name="permissionRole" id="permissionRole" value={permissionRole} onChange={(e) => setPermissionRole(e.target.value as any)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" required>
                                    {permissionRoleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-300">Location</label>
                                <select name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value as any)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" required>
                                    {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300">Job Roles</label>
                                <MultiSelectDropdown
                                    options={jobRoleOptions}
                                    selectedValues={selectedJobRoleIds}
                                    onChange={setSelectedJobRoleIds}
                                    placeholder="Assign job roles..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 px-6 py-4 flex justify-end items-center gap-3 border-t border-slate-700">
                        <button type="button" onClick={onClose} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600">Cancel</button>
                        <button type="submit" disabled={isSaving} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:bg-slate-600">
                            {isSaving ? 'Saving...' : 'Save Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeFormModal;