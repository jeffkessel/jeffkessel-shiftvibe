// This file is a placeholder for your authentication service (e.g., Clerk, Auth.js).
// It simulates common authentication functions.
import { employees } from '../lib/mockData';
import { Employee } from '../lib/mockData';

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || 'sk_placeholder_...';
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_placeholder_...';

// --- !!! FOR DEVELOPMENT: Change this ID to test different user roles ---
// 8 = Heidi Owner (Owner)
// 1 = Alice Johnson (Manager)
// 2 = Bob Williams (Employee)
const MOCK_CURRENT_USER_ID = 8; 

class AuthService {
  private currentUser: Employee | null = null;

  constructor() {
    console.log("Auth Service initialized with placeholder keys.");
    if (!NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_')) {
        console.warn('Clerk publishable key seems invalid.');
    }
  }

  /**
   * Mocks getting the current user's session.
   */
  async getCurrentUser(): Promise<Employee | null> {
    console.log(`Checking for user session (mock for user ID: ${MOCK_CURRENT_USER_ID})...`);
    if(this.currentUser && this.currentUser.id === MOCK_CURRENT_USER_ID) {
      return this.currentUser;
    }
    
    // In a real app, this would interact with the auth provider's SDK.
    const user = employees.find(e => e.id === MOCK_CURRENT_USER_ID);
    if (user) {
        this.currentUser = user;
        return user;
    }
    return null;
  }

  /**
   * Mocks the sign-in process.
   */
  async signIn() {
    console.log("Redirecting to sign-in page (mock)...");
    // In a real app, this would redirect or open a modal from the auth provider.
  }

  /**
   * Mocks the sign-out process.
   */
  async signOut() {
    console.log("Signing out (mock)...");
    this.currentUser = null;
    // In a real app, this would clear the session and redirect.
  }
}

export const authService = new AuthService();