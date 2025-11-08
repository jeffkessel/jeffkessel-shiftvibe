import React, { useState, useEffect } from 'react';
import { Company } from '@/lib/mockData';

interface CompanyDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company;
    onSave: (updates: Partial<Pick<Company, 'name'>>) => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ isOpen, onClose, company, onSave }) => {
    const [companyName, setCompanyName] = useState(company.name);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (company) {
            setCompanyName(company.name);
        }
    }, [company]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave({ name: companyName });
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">Company Details</h3>
                        <p className="text-sm text-slate-400 mt-1">Update your company's information.</p>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-slate-300">Company Name</label>
                                <input type="text" name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" required />
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

export default CompanyDetailsModal;