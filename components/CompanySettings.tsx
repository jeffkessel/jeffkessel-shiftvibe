import React, { useState } from 'react';
import { Company } from '../lib/mockData';
import { stripeService } from '../services/stripe';
import CompanyDetailsModal from './CompanyDetailsModal';

interface CompanySettingsProps {
    company: Company;
    onCompanyUpdate: (updates: Partial<Pick<Company, 'name'>>) => Promise<boolean>;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ company, onCompanyUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleManageBilling = async () => {
        const result = await stripeService.redirectToCustomerPortal();
        if (result.success) {
            alert(`Redirecting to billing portal (mock): ${result.url}`);
        } else {
            alert('Could not open billing portal.');
        }
    };

    const handleSave = async (updates: Partial<Pick<Company, 'name'>>) => {
        const success = await onCompanyUpdate(updates);
        if (success) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="bg-slate-800 rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-bold text-white mb-4">Company Settings (Owner)</h3>
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        As the owner, you can manage billing, integrations, and company-wide settings.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                         <button 
                            onClick={handleManageBilling}
                            className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                            Manage Billing
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex-1 rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                            Company Details
                        </button>
                    </div>
                </div>
            </div>
            <CompanyDetailsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                company={company}
                onSave={handleSave}
            />
        </>
    );
};

export default CompanySettings;