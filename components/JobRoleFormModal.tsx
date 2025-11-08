import React, { useState, useEffect } from 'react';
import { JobRole } from '../lib/mockData';

interface JobRoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<JobRole, 'id'>) => void;
    jobRole: JobRole | null;
}

const JobRoleFormModal: React.FC<JobRoleFormModalProps> = ({ isOpen, onClose, onSave, jobRole }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState<'Front of House' | 'Back of House' | 'Bar' | 'Management'>('Front of House');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (jobRole) {
            setName(jobRole.name);
            setDepartment(jobRole.department);
        } else {
            setName('');
            setDepartment('Front of House');
        }
    }, [jobRole, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave({ name, department });
        setIsSaving(false);
    };

    const departmentOptions = ['Front of House', 'Back of House', 'Bar', 'Management'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">{jobRole ? 'Edit Job Role' : 'Add Job Role'}</h3>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Role Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" required />
                            </div>
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-slate-300">Department</label>
                                <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value as any)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white" required>
                                    {departmentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 px-6 py-4 flex justify-end items-center gap-3 border-t border-slate-700">
                        <button type="button" onClick={onClose} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600">Cancel</button>
                        <button type="submit" disabled={isSaving} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:bg-slate-600">
                            {isSaving ? 'Saving...' : 'Save Role'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobRoleFormModal;