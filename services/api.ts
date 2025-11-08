// This file contains functions that simulate calling a backend API.
// It uses the mock database service to get data, representing what would happen
// on the server in a real full-stack application.
import { db } from '@/services/db';
import { Employee, Shift, Company, JobRole } from '@/lib/mockData';
import { authService } from '@/services/auth';

interface ScheduleData {
    employees: Employee[];
    shifts: Shift[];
    jobRoles: JobRole[];
    filterOptions: {
        locations: string[];
        departments: string[];
        roles: string[];
    }
}

/**
 * Mocks a GET request to an endpoint like `/api/schedule`.
 * Fetches all necessary data for the dashboard view.
 */
export const getScheduleData = async (): Promise<ScheduleData> => {
    console.log('API CALL (mock): Fetching initial schedule data...');
    // In a real API, these might be parallel database queries.
    const [employees, jobRoles] = await Promise.all([
        db.getAllEmployees(),
        db.getAllJobRoles()
    ]);
    
    // For the prototype, we'll fetch shifts for the current week.
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const shifts = await db.getShiftsByDateRange(weekStart, weekEnd);

    // Derive filter options from the fetched data
    const filterOptions = {
      locations: ['All', ...Array.from(new Set(employees.map(e => e.location)))],
      departments: ['All', ...Array.from(new Set(jobRoles.map(r => r.department)))],
      roles: ['All', ...Array.from(new Set(jobRoles.map(r => r.name)))],
    };

    return { employees, shifts, jobRoles, filterOptions };
};

/**
 * Mocks a GET request for all data needed for the Company management page.
 */
export const getCompanyData = async () => {
    console.log('API CALL (mock): Fetching company management data...');
    const [employees, jobRoles] = await Promise.all([
        db.getAllEmployees(),
        db.getAllJobRoles()
    ]);
    return { employees, jobRoles };
};


/**
 * Mocks a GET request to an endpoint like `/api/users/:id`.
 * Fetches profile data for a specific user, including their job roles.
 */
export const getUserProfileData = async (userId: number) => {
    console.log(`API CALL (mock): Fetching profile data for user ${userId}...`);
    const [user, shifts, allJobRoles] = await Promise.all([
        db.getUserById(userId),
        db.getShiftsByEmployeeId(userId),
        db.getAllJobRoles()
    ]);

    if (!user) throw new Error("User not found");

    return { user, shifts, allJobRoles };
}

/**
 * Mocks a PATCH request to an endpoint like `/api/users/:id`.
 * Updates the current user's profile details, including job roles.
 */
export const updateUserProfile = async (userId: number, updates: Partial<Pick<Employee, 'name' | 'location' | 'jobRoleIds'>>) => {
    console.log(`API CALL (mock): Updating profile for user ${userId}...`);
    const updatedUser = await db.updateEmployeeDetails(userId, updates);
    if (!updatedUser) throw new Error("Failed to update user profile.");
    return updatedUser;
};

/**
 * Mocks a GET request to an endpoint like `/api/company/:id`.
 */
export const getCompanyInfo = async (companyId: number): Promise<Company> => {
    console.log(`API CALL (mock): Fetching company info for ID ${companyId}...`);
    const company = await db.getCompanyById(companyId);
    if (!company) throw new Error("Company not found.");
    return company;
};

/**
 * Mocks a PATCH request to an endpoint like `/api/company/:id`.
 */
export const updateCompanyInfo = async (companyId: number, updates: Partial<Pick<Company, 'name'>>) => {
    console.log(`API CALL (mock): Updating company info for ID ${companyId}...`);
    const updatedCompany = await db.updateCompany(companyId, updates);
    if (!updatedCompany) throw new Error("Failed to update company.");
    return updatedCompany;
};


/**
 * Mocks a GET request to an endpoint like `/api/team`.
 * Fetches the employees managed by the current user.
 */
export const getManagedTeam = async () => {
    console.log(`API CALL (mock): Fetching managed team...`);
    const currentUser = await authService.getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");
    
    if (currentUser.permissionRole !== 'Manager' && currentUser.permissionRole !== 'Owner') {
        return []; // Employees don't manage anyone
    }

    const team = await db.getManagedEmployees(currentUser.id, currentUser.permissionRole);
    return team;
}


/**
 * Mocks a POST request to an endpoint like `/api/shifts/publish`.
 */
export const publishShifts = async () => {
    console.log('API CALL (mock): POST /api/shifts/publish');
    const result = await db.publishAllDrafts();
    console.log(`Published ${result.updatedCount} shifts.`);
    return result;
}

// --- Job Role API ---

export const addJobRole = async (newRole: Omit<JobRole, 'id'>) => {
    console.log('API CALL (mock): POST /api/job-roles', newRole);
    return await db.createJobRole(newRole);
};

export const editJobRole = async (roleId: number, updates: Partial<Omit<JobRole, 'id'>>) => {
    console.log(`API CALL (mock): PATCH /api/job-roles/${roleId}`, updates);
    return await db.updateJobRole(roleId, updates);
};

export const deleteJobRole = async (roleId: number) => {
    console.log(`API CALL (mock): DELETE /api/job-roles/${roleId}`);
    return await db.deleteJobRole(roleId);
};

// --- Employee API ---
export const addEmployee = async (employeeData: Omit<Employee, 'id' | 'avatar'>) => {
    console.log('API CALL (mock): POST /api/employees', employeeData);
    return await db.createEmployee(employeeData);
};

export const editEmployee = async (employeeId: number, updates: Partial<Omit<Employee, 'id' | 'avatar'>>) => {
    console.log(`API CALL (mock): PATCH /api/employees/${employeeId}`, updates);
    return await db.updateEmployee(employeeId, updates);
};