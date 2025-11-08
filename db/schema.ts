// This file contains Drizzle ORM schema placeholders.
// In a real Next.js application, you would use these with drizzle-kit to generate migrations.
// For this React SPA prototype, it serves as a structural definition.

import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// Note: Relationships are commented out as they depend on the final ORM setup.

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique(), // Placeholder for Clerk user ID
  email: text('email').notNull().unique(),
  role: text('role', { enum: ['owner', 'manager', 'employee'] }).default('employee').notNull(),
  companyId: integer('company_id'), // .references(() => companies.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  companyId: integer('company_id').notNull(), // .references(() => companies.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const jobRoles = pgTable('job_roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  departmentId: integer('department_id').notNull(), // .references(() => departments.id)
  companyId: integer('company_id').notNull(), // .references(() => companies.id)
});

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // .references(() => users.id),
  jobRoleId: integer('job_role_id'), // .references(() => jobRoles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const shifts = pgTable('shifts', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull(), // .references(() => employees.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: text('status', { enum: ['draft', 'published', 'completed', 'cancelled'] }).default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});