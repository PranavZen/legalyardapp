/**
 * Common types for the Legalyard Suite application
 */

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'admin' | 'attorney' | 'paralegal' | 'client';

// Authentication related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Case Management related types
export type CaseStatus = 'active' | 'pending' | 'closed';
export type CasePriority = 'high' | 'medium' | 'low';

export interface Case {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  status: CaseStatus;
  priority: CasePriority;
  description: string;
  practiceArea: string;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  documents: string[];
  tasks: string[];
  notes: CaseNote[];
}

export interface CaseNote {
  id: string;
  caseId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface CaseCreateInput {
  title: string;
  clientId: string;
  clientName: string;
  status: CaseStatus;
  priority: CasePriority;
  description: string;
  practiceArea: string;
  assignedTo: string[];
  dueDate: string;
}

export interface CaseUpdateInput {
  id: string;
  title?: string;
  clientId?: string;
  clientName?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  description?: string;
  practiceArea?: string;
  assignedTo?: string[];
  dueDate?: string;
}

export interface CaseNoteInput {
  caseId: string;
  content: string;
}

export interface CasesState {
  cases: Case[];
  currentCase: Case | null;
  isLoading: boolean;
  error: string | null;
}

// Navigation related types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Cases: undefined;
  Calendar: undefined;
  Documents: undefined;
  Settings: undefined;
};

export type CaseManagementStackParamList = {
  CaseList: undefined;
  CaseDetail: { id: string };
  CaseForm: { id?: string };
  CaseNotes: { id: string };
  CaseDocuments: { id: string };
  CaseTasks: { id: string };
};

// API related types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// UI related types
export interface ToastMessage {
  title: string;
  description?: string;
  status: 'info' | 'warning' | 'success' | 'error';
}

// Form related types
export interface FormErrors {
  [key: string]: string;
}
