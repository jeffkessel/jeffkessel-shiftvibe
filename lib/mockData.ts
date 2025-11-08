export interface Company {
  id: number;
  name: string;
}

export interface JobRole {
  id: number;
  name: string;
  department: 'Front of House' | 'Back of House' | 'Bar' | 'Management';
}

export interface Employee {
  id: number;
  name: string;
  permissionRole: 'Owner' | 'Manager' | 'Employee';
  jobRoleIds: number[];
  location: 'Downtown' | 'Uptown' | 'Corporate';
  avatar: string;
  companyId: number;
}

export interface Shift {
  id: number;
  employeeId: number;
  startTime: Date;
  endTime: Date;
  status: 'published' | 'draft';
}

// Helper to create dates for the current week
const createDate = (dayOffset: number, hour: number, minute: number = 0): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const date = new Date(today);
  date.setDate(today.getDate() + mondayOffset + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const companies: Company[] = [
  { id: 1, name: 'ShiftVibe Eateries Inc.'}
];

export const jobRoles: JobRole[] = [
  { id: 1, name: 'Manager', department: 'Management' },
  { id: 2, name: 'Chef', department: 'Back of House' },
  { id: 3, name: 'Server', department: 'Front of House' },
  { id: 4, name: 'Cashier', department: 'Front of House' },
  { id: 5, name: 'Barista', department: 'Bar' },
];

export const employees: Employee[] = [
  { id: 1, name: 'Alice Johnson', permissionRole: 'Manager', jobRoleIds: [1, 3], location: 'Downtown', avatar: 'https://i.pravatar.cc/150?u=1', companyId: 1 },
  { id: 2, name: 'Bob Williams', permissionRole: 'Employee', jobRoleIds: [2], location: 'Downtown', avatar: 'https://i.pravatar.cc/150?u=2', companyId: 1 },
  { id: 3, name: 'Charlie Brown', permissionRole: 'Employee', jobRoleIds: [3], location: 'Downtown', avatar: 'https://i.pravatar.cc/150?u=3', companyId: 1 },
  { id: 4, name: 'Diana Miller', permissionRole: 'Employee', jobRoleIds: [4], location: 'Uptown', avatar: 'https://i.pravatar.cc/150?u=4', companyId: 1 },
  { id: 5, name: 'Ethan Davis', permissionRole: 'Employee', jobRoleIds: [5, 4], location: 'Uptown', avatar: 'https://i.pravatar.cc/150?u=5', companyId: 1 },
  { id: 6, name: 'Fiona Garcia', permissionRole: 'Employee', jobRoleIds: [3], location: 'Uptown', avatar: 'https://i.pravatar.cc/150?u=6', companyId: 1 },
  { id: 7, name: 'George Rodriguez', permissionRole: 'Employee', jobRoleIds: [2], location: 'Uptown', avatar: 'https://i.pravatar.cc/150?u=7', companyId: 1 },
  { id: 8, name: 'Heidi Owner', permissionRole: 'Owner', jobRoleIds: [1], location: 'Corporate', avatar: 'https://i.pravatar.cc/150?u=8', companyId: 1 },
];

export const shifts: Shift[] = [
  // Alice (Manager) - Mon, Tue, Wed
  { id: 1, employeeId: 1, startTime: createDate(0, 9), endTime: createDate(0, 17), status: 'published' },
  { id: 2, employeeId: 1, startTime: createDate(1, 9), endTime: createDate(1, 17), status: 'published' },
  { id: 3, employeeId: 1, startTime: createDate(2, 9), endTime: createDate(2, 17), status: 'published' },
  // Bob (Chef) - Mon, Wed, Fri
  { id: 4, employeeId: 2, startTime: createDate(0, 10), endTime: createDate(0, 18), status: 'published' },
  { id: 5, employeeId: 2, startTime: createDate(2, 12), endTime: createDate(2, 20), status: 'draft' },
  { id: 6, employeeId: 2, startTime: createDate(4, 14), endTime: createDate(4, 22), status: 'published' },
  // Charlie (Server) - Tue, Thu, Sat
  { id: 7, employeeId: 3, startTime: createDate(1, 11), endTime: createDate(1, 19), status: 'published' },
  { id: 8, employeeId: 3, startTime: createDate(3, 11), endTime: createDate(3, 19), status: 'draft' },
  { id: 9, employeeId: 3, startTime: createDate(5, 17), endTime: createDate(5, 23), status: 'published' },
  // Diana (Cashier) - Mon, Wed, Fri
  { id: 10, employeeId: 4, startTime: createDate(0, 8), endTime: createDate(0, 16), status: 'draft' },
  { id: 11, employeeId: 4, startTime: createDate(2, 8), endTime: createDate(2, 16), status: 'published' },
  { id: 12, employeeId: 4, startTime: createDate(4, 8), endTime: createDate(4, 16), status: 'published' },
  // Ethan (Barista) - Tue, Thu, Sat
  { id: 13, employeeId: 5, startTime: createDate(1, 7), endTime: createDate(1, 15), status: 'published' },
  { id: 14, employeeId: 5, startTime: createDate(3, 7), endTime: createDate(3, 15), status: 'published' },
  { id: 15, employeeId: 5, startTime: createDate(5, 9), endTime: createDate(5, 17), status: 'draft' },
  // Fiona (Server) - Wed, Fri
  { id: 16, employeeId: 6, startTime: createDate(2, 16), endTime: createDate(2, 22), status: 'published' },
  { id: 17, employeeId: 6, startTime: createDate(4, 16), endTime: createDate(4, 22), status: 'published' },
  // George (Chef) - Tue, Sat, Sun
  { id: 18, employeeId: 7, startTime: createDate(1, 15), endTime: createDate(1, 23), status: 'draft' },
  { id: 19, employeeId: 7, startTime: createDate(5, 15), endTime: createDate(5, 23), status: 'published' },
  { id: 20, employeeId: 7, startTime: createDate(6, 15), endTime: createDate(6, 23), status: 'published' },
];