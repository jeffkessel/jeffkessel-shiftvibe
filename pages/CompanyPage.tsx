import React, { useState, useEffect, useCallback } from 'react';
import { getCompanyData, deleteJobRole, editJobRole, addJobRole, addEmployee, editEmployee } from '../services/api';
import { Employee, JobRole } from '../lib/mockData';
import EmployeeManagement from '../components/EmployeeManagement';
import JobRoleManagement from '../components/JobRoleManagement';
import JobRoleFormModal from '../components/JobRoleFormModal';
import EmployeeFormModal from '../components/EmployeeFormModal';
import { authService } from '../services/auth';

type ActiveTab = 'employees' | 'roles';

const CompanyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('employees');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<Employee | null>(null);

    // State for Modals
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<JobRole | null>(null);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);


    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [data, user] = await Promise.all([getCompanyData(), authService.getCurrentUser()]);
            setEmployees(data.employees);
            setJobRoles(data.jobRoles);
            setCurrentUser(user);
        } catch (err) {
            setError('Failed to load company data.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Job Role Handlers ---
    const handleAddRoleClick = () => {
        setEditingRole(null);
        setIsRoleModalOpen(true);
    };

    const handleEditRoleClick = (role: JobRole) => {
        setEditingRole(role);
        setIsRoleModalOpen(true);
    };
    
    const handleDeleteRole = async (roleId: number) => {
        if (window.confirm('Are you sure you want to delete this job role? This will unassign it from all employees.')) {
            try {
                await deleteJobRole(roleId);
                await fetchData(); // Refresh data
            } catch (error) {
                alert('Failed to delete job role.');
            }
        }
    };

    const handleSaveRole = async (roleData: Omit<JobRole, 'id'>) => {
        try {
            if (editingRole) {
                await editJobRole(editingRole.id, roleData);
            } else {
                await addJobRole(roleData);
            }
            setIsRoleModalOpen(false);
            await fetchData(); // Refresh data
        } catch (error) {
             alert(`Failed to save job role.`);
        }
    };
    
    // --- Employee Handlers ---
    const handleAddEmployeeClick = () => {
        setEditingEmployee(null);
        setIsEmployeeModalOpen(true);
    };
    
    const handleEditEmployeeClick = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsEmployeeModalOpen(true);
    };
    
    const handleSaveEmployee = async (employeeData: Omit<Employee, 'id' | 'avatar' | 'companyId'>) => {
        if (!currentUser) return;
        try {
            if (editingEmployee) {
                await editEmployee(editingEmployee.id, employeeData);
            } else {
                await addEmployee({ ...employeeData, companyId: currentUser.companyId });
            }
            setIsEmployeeModalOpen(false);
            await fetchData(); // Refresh data
        } catch (error) {
            alert('Failed to save employee.');
        }
    };


    if (isLoading) return <div className="text-center text-slate-400">Loading company data...</div>;
    if (error) return <div className="text-center text-red-400">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Company Management</h1>
                <p className="mt-2 text-slate-400">Manage your employees and the job roles within your company.</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('employees')}
                        className={`${activeTab === 'employees' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Employees
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`${activeTab === 'roles' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Job Roles
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'employees' && (
                    <EmployeeManagement 
                        employees={employees} 
                        jobRoles={jobRoles}
                        onAddClick={handleAddEmployeeClick}
                        onEditClick={handleEditEmployeeClick}
                    />
                )}
                {activeTab === 'roles' && (
                    <JobRoleManagement 
                        jobRoles={jobRoles} 
                        onAddClick={handleAddRoleClick}
                        onEditClick={handleEditRoleClick}
                        onDeleteClick={handleDeleteRole}
                    />
                )}
            </div>
            
            <JobRoleFormModal 
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onSave={handleSaveRole}
                jobRole={editingRole}
            />
            
            <EmployeeFormModal
                isOpen={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                onSave={handleSaveEmployee}
                employee={editingEmployee}
                allJobRoles={jobRoles}
            />

        </div>
    );
};

export default CompanyPage;