import { create } from 'zustand';
import { findUserByUsername, createUser } from '../database/database';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    
    try {
      const foundUser = await findUserByUsername(username);
      
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      if (foundUser.password !== password) {
        throw new Error('Invalid password');
      }
      
      // Create a user object without the password
      const loggedInUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      
      set({ user: loggedInUser, loading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred',
        loading: false
      });
    }
  },
  
  register: async (username: string, password: string, email?: string) => {
    set({ loading: true, error: null });
    
    try {
      // Check if user already exists
      const existingUser = await findUserByUsername(username);
      
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      // Create new user
      const userId = await createUser(username, password, email);
      
      // Log in the newly created user
      const newUser = {
        id: userId,
        username,
        email: email || null,
      };
      
      set({ user: newUser, loading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred',
        loading: false
      });
    }
  },
  
  logout: () => {
    set({ user: null });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));