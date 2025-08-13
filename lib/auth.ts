import { userService } from './firebaseService';

// Updated admin credentials (not shown publicly)
const ADMIN_CREDENTIALS = {
  email: 'akk116636@gmail.com',
  password: 'alikhan009',
  role: 'admin' as const,
};

export async function signIn(email: string, password: string) {
  try {
    // Check against updated admin credentials
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user = {
        id: 'admin-user-id',
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return {
        success: true,
        user,
      };
    }

<<<<<<< HEAD
    // Try custom authentication with supabase
    const userData = await userService.getUserByEmail(email)
=======
    // Try custom authentication with Firebase
    const userData = await userService.getUserByEmail(email);
>>>>>>> 04c852e (Fix code style and small errors)

    if (!userData) {
      throw new Error('Invalid email or password');
    }

    // For demo purposes, we'll skip password hashing verification
    const user = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
}

export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
