// This file simulates a database connection layer using Drizzle ORM.
import { employees as mockEmployees, shifts as mockShifts, companies as mockCompanies, jobRoles as mockJobRoles, Shift, Employee, Company, JobRole } from '../lib/mockData';

// --- PRODUCTION DATABASE CLIENT (PLACEHOLDER) ---
// In a real server environment (like Next.js API routes), you would initialize your
// database connection here using your DATABASE_URL from environment variables.
// This is commented out because we cannot securely connect to a database from the client-side.
/*
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
// The drizzle client is configured with the schema to be fully type-safe.
export const db = drizzle(sql, { schema });
*/


// --- MOCK DATABASE SERVICE ---
// This service simulates asynchronous database queries against our mock data.
// It helps build the frontend as if it were talking to a real API.

// In-memory "database"
let shiftsDb: Shift[] = [...mockShifts];
let employeesDb: Employee[] = [...mockEmployees];
let companiesDb: Company[] = [...mockCompanies];
let jobRolesDb: JobRole[] = [...mockJobRoles];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const db = {
  /**
   * Simulates fetching shifts for a given date range.
   */
  async getShiftsByDateRange(start: Date, end: Date): Promise<Shift[]> {
    await delay(400); // Simulate network latency
    return shiftsDb.filter(shift => {
      const shiftDate = shift.startTime;
      return shiftDate >= start && shiftDate <= end;
    });
  },

  /**
   * Simulates fetching all employees.
   */
  async getAllEmployees(): Promise<Employee[]> {
    await delay(300);
    return employeesDb;
  },
  
  /**
   * Simulates fetching all job roles.
   */
  async getAllJobRoles(): Promise<JobRole[]> {
    await delay(200);
    return jobRolesDb;
  },

  /**
   * Simulates fetching a single user by their ID.
   */
  async getUserById(id: number): Promise<Employee | undefined> {
    await delay(150);
    return employeesDb.find(e => e.id === id);
  },

  /**
   * Simulates fetching all shifts for a specific employee.
   */
  async getShiftsByEmployeeId(employeeId: number): Promise<Shift[]> {
    await delay(200);
    return shiftsDb
      .filter(s => s.employeeId === employeeId && s.startTime > new Date())
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  },
  
  /**
   * Simulates fetching employees managed by a specific manager or all for an owner.
   */
  async getManagedEmployees(managerId: number, managerRole: Employee['permissionRole']): Promise<Employee[]> {
    await delay(300);
    if (managerRole === 'Owner') {
      // Owner sees everyone except themselves
      return employeesDb.filter(e => e.id !== managerId);
    }
    if (managerRole === 'Manager') {
      // Manager sees employees with the same location (simple logic for mock)
      const manager = employeesDb.find(e => e.id === managerId);
      if (!manager) return [];
      return employeesDb.filter(e => e.location === manager.location && e.id !== managerId);
    }
    return [];
  },

  /**
   * Simulates updating an employee's details, including their job roles.
   */
  async updateEmployeeDetails(employeeId: number, updates: Partial<Pick<Employee, 'name' | 'location' | 'jobRoleIds'>>): Promise<Employee | null> {
    await delay(400);
    let updatedEmployee: Employee | null = null;
    employeesDb = employeesDb.map(emp => {
      if (emp.id === employeeId) {
        updatedEmployee = { ...emp, ...updates };
        return updatedEmployee;
      }
      return emp;
    });
    return updatedEmployee;
  },

  /**
   * Simulates fetching company details.
   */
  async getCompanyById(companyId: number): Promise<Company | undefined> {
    await delay(100);
    return companiesDb.find(c => c.id === companyId);
  },
  
  /**
   * Simulates updating company details.
   */
  async updateCompany(companyId: number, updates: Partial<Pick<Company, 'name'>>): Promise<Company | null> {
    await delay(350);
    let updatedCompany: Company | null = null;
    companiesDb = companiesDb.map(comp => {
      if (comp.id === companyId) {
        updatedCompany = { ...comp, ...updates };
        return updatedCompany;
      }
      return comp;
    });
    return updatedCompany;
  },

  /**
   * Simulates creating a new job role.
   */
  async createJobRole(newRole: Omit<JobRole, 'id'>): Promise<JobRole> {
    await delay(300);
    const createdRole: JobRole = {
      ...newRole,
      id: Math.max(0, ...jobRolesDb.map(r => r.id)) + 1,
    };
    jobRolesDb.push(createdRole);
    return createdRole;
  },

  /**
   * Simulates updating an existing job role.
   */
  async updateJobRole(roleId: number, updates: Partial<Omit<JobRole, 'id'>>): Promise<JobRole | null> {
    await delay(300);
    let updatedRole: JobRole | null = null;
    jobRolesDb = jobRolesDb.map(role => {
      if (role.id === roleId) {
        updatedRole = { ...role, ...updates };
        return updatedRole;
      }
      return role;
    });
    return updatedRole;
  },
  
  /**
   * Simulates deleting a job role.
   */
  async deleteJobRole(roleId: number): Promise<{ success: boolean }> {
    await delay(400);
    const initialLength = jobRolesDb.length;
    jobRolesDb = jobRolesDb.filter(role => role.id !== roleId);
    // Also remove this role from any employees who have it
    employeesDb = employeesDb.map(emp => ({
        ...emp,
        jobRoleIds: emp.jobRoleIds.filter(id => id !== roleId)
    }));
    return { success: jobRolesDb.length < initialLength };
  },
  
  /**
   * Simulates creating a new employee.
   */
  async createEmployee(newEmployeeData: Omit<Employee, 'id' | 'avatar'>): Promise<Employee> {
    await delay(400);
    const newId = Math.max(0, ...employeesDb.map(e => e.id)) + 1;
    const newEmployee: Employee = {
        ...newEmployeeData,
        id: newId,
        avatar: `https://i.pravatar.cc/150?u=${newId}`,
    };
    employeesDb.push(newEmployee);
    return newEmployee;
  },

  /**
   * Simulates updating an existing employee.
   */
  async updateEmployee(employeeId: number, updates: Partial<Omit<Employee, 'id' | 'avatar'>>): Promise<Employee | null> {
    await delay(400);
    let updatedEmployee: Employee | null = null;
    employeesDb = employeesDb.map(emp => {
      if (emp.id === employeeId) {
        updatedEmployee = { ...emp, ...updates };
        return updatedEmployee;
      }
      return emp;
    });
    return updatedEmployee;
  },

  /**
   * Simulates updating all draft shifts to be published.
   */
  async publishAllDrafts(): Promise<{ updatedCount: number }> {
    await delay(500);
    let updatedCount = 0;
    shiftsDb = shiftsDb.map(shift => {
      if (shift.status === 'draft') {
        updatedCount++;
        return { ...shift, status: 'published' };
      }
      return shift;
    });
    return { updatedCount };
  },

  /**
   * Simulates inserting a new shift into the database.
   */
  async createShift(newShift: Omit<Shift, 'id'>): Promise<Shift> {
    await delay(250);
    const createdShift: Shift = {
      ...newShift,
      id: Math.max(0, ...shiftsDb.map(s => s.id)) + 1,
    };
    shiftsDb.push(createdShift);
    return createdShift;
  }
};

console.log("Mock database service initialized. This will simulate API calls.");