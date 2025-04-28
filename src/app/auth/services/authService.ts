import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../../store/slices/authSlice';

// Mock data for development
const MOCK_USERS = [
  {
    id: '1',
    email: 'lawyer@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'lawyer',
    subscription: 'premium',
  },
  {
    id: '2',
    email: 'finance@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'finance',
    subscription: 'enterprise',
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'password123',
    name: 'Bob Johnson',
    role: 'general',
    subscription: 'free',
  },
];

// In a real app, these would be API calls
export const authService = {
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Generate a mock token
    const token = `mock-jwt-token-${Date.now()}`;

    // Store token in AsyncStorage
    await AsyncStorage.setItem('auth_token', token);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword as User,
      token,
    };
  },

  register: async (userData: any) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email already exists
    const existingUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error('Email already in use');
    }

    // In a real app, this would create a new user in the database
    // For now, we'll just return success
    return { success: true };
  },

  forgotPassword: async (email: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email exists
    const existingUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!existingUser) {
      throw new Error('Email not found');
    }

    // In a real app, this would send a password reset email
    // For now, we'll just return success
    return { success: true };
  },

  logout: async () => {
    // Remove token from AsyncStorage
    await AsyncStorage.removeItem('auth_token');
    return { success: true };
  },

  checkAuth: async () => {
    // Check if token exists in AsyncStorage
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  },
};
