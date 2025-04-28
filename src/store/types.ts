/**
 * Redux store types
 */

import { store } from './index';
import { AuthState, CasesState } from '../types';

// Root state type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;

// UI state type
export interface UiState {
  theme: 'light' | 'dark';
  isDrawerOpen: boolean;
  isLoading: boolean;
  toast: {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
}

// Document state type
export interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  isLoading: boolean;
  error: string | null;
}

export interface Document {
  id: string;
  title: string;
  caseId: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

// Task state type
export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  caseId: string;
  assignedTo: string[];
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
}

// Finance state type
export interface FinanceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
}

export interface Invoice {
  id: string;
  caseId: string;
  clientId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}
