import { get, post, put, del } from '../../../services/api/apiClient';
import { MOCK_INVOICES, MOCK_TIME_ENTRIES } from '../../../services/api/mockData';

// Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: string | null;
  issueDate: string | null;
  paymentDate: string | null;
  items: {
    id: string;
    description: string;
    hours: number | null;
    rate: number | null;
    amount: number;
  }[];
  notes: string;
  caseId: string | null;
  caseName: string | null;
}

export interface TimeEntry {
  id: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  caseId: string | null;
  caseName: string | null;
  clientId: string | null;
  clientName: string | null;
  billable: boolean;
  billed: boolean;
  rate: number;
  amount: number;
  notes: string;
  userId: string;
  userName: string;
}

export interface InvoiceCreateInput {
  clientId: string;
  currency: string;
  dueDate: string;
  items: {
    description: string;
    hours?: number;
    rate?: number;
    amount: number;
  }[];
  notes?: string;
  caseId?: string | null;
}

export interface InvoiceUpdateInput {
  id: string;
  clientId?: string;
  currency?: string;
  status?: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate?: string | null;
  issueDate?: string | null;
  paymentDate?: string | null;
  items?: {
    id?: string;
    description: string;
    hours?: number | null;
    rate?: number | null;
    amount: number;
  }[];
  notes?: string;
  caseId?: string | null;
}

export interface TimeEntryCreateInput {
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  caseId?: string | null;
  billable: boolean;
  rate?: number;
  notes?: string;
}

export interface TimeEntryUpdateInput {
  id: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  caseId?: string | null;
  billable?: boolean;
  billed?: boolean;
  rate?: number;
  amount?: number;
  notes?: string;
}

// In a real app, these would make API calls
// For now, we'll use mock data

/**
 * Get all invoices
 * @returns List of invoices
 */
export const getInvoices = async (): Promise<Invoice[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return get<Invoice[]>('/invoices');
  return MOCK_INVOICES;
};

/**
 * Get an invoice by ID
 * @param id Invoice ID
 * @returns Invoice details
 */
export const getInvoiceById = async (id: string): Promise<Invoice | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return get<Invoice>(`/invoices/${id}`);
  const invoice = MOCK_INVOICES.find((i) => i.id === id);
  return invoice || null;
};

/**
 * Create a new invoice
 * @param invoiceData Invoice data
 * @returns Created invoice
 */
export const createInvoice = async (invoiceData: InvoiceCreateInput): Promise<Invoice> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app: return post<Invoice>('/invoices', invoiceData);
  
  // Mock implementation
  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(MOCK_INVOICES.length + 1).padStart(3, '0')}`;
  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  
  const newInvoice: Invoice = {
    id: `${Date.now()}`,
    invoiceNumber,
    clientId: invoiceData.clientId,
    clientName: 'Mock Client', // In a real app, this would come from the API
    amount: totalAmount,
    currency: invoiceData.currency,
    status: 'draft',
    dueDate: invoiceData.dueDate,
    issueDate: null,
    paymentDate: null,
    items: invoiceData.items.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      description: item.description,
      hours: item.hours || null,
      rate: item.rate || null,
      amount: item.amount,
    })),
    notes: invoiceData.notes || '',
    caseId: invoiceData.caseId || null,
    caseName: invoiceData.caseId ? 'Mock Case' : null, // In a real app, this would come from the API
  };
  
  return newInvoice;
};

/**
 * Update an invoice
 * @param invoiceData Invoice data
 * @returns Updated invoice
 */
export const updateInvoice = async (invoiceData: InvoiceUpdateInput): Promise<Invoice> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return put<Invoice>(`/invoices/${invoiceData.id}`, invoiceData);
  
  // Mock implementation
  const existingInvoice = MOCK_INVOICES.find((i) => i.id === invoiceData.id);
  
  if (!existingInvoice) {
    throw new Error('Invoice not found');
  }
  
  // Calculate total amount if items are updated
  let totalAmount = existingInvoice.amount;
  if (invoiceData.items) {
    totalAmount = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  }
  
  const updatedInvoice: Invoice = {
    ...existingInvoice,
    ...invoiceData,
    amount: totalAmount,
    items: invoiceData.items
      ? invoiceData.items.map((item, index) => ({
          id: item.id || `${Date.now()}-${index}`,
          description: item.description,
          hours: item.hours || null,
          rate: item.rate || null,
          amount: item.amount,
        }))
      : existingInvoice.items,
  };
  
  return updatedInvoice;
};

/**
 * Delete an invoice
 * @param id Invoice ID
 * @returns Success status
 */
export const deleteInvoice = async (id: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return del<{ success: boolean }>(`/invoices/${id}`);
  
  // Mock implementation
  return { success: true };
};

/**
 * Mark an invoice as paid
 * @param id Invoice ID
 * @param paymentDate Payment date
 * @returns Updated invoice
 */
export const markInvoiceAsPaid = async (id: string, paymentDate: string): Promise<Invoice> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return put<Invoice>(`/invoices/${id}/mark-paid`, { paymentDate });
  
  // Mock implementation
  const existingInvoice = MOCK_INVOICES.find((i) => i.id === id);
  
  if (!existingInvoice) {
    throw new Error('Invoice not found');
  }
  
  const updatedInvoice: Invoice = {
    ...existingInvoice,
    status: 'paid',
    paymentDate,
  };
  
  return updatedInvoice;
};

/**
 * Send an invoice to client
 * @param id Invoice ID
 * @returns Updated invoice
 */
export const sendInvoice = async (id: string): Promise<Invoice> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return post<Invoice>(`/invoices/${id}/send`);
  
  // Mock implementation
  const existingInvoice = MOCK_INVOICES.find((i) => i.id === id);
  
  if (!existingInvoice) {
    throw new Error('Invoice not found');
  }
  
  const updatedInvoice: Invoice = {
    ...existingInvoice,
    status: 'pending',
    issueDate: new Date().toISOString(),
  };
  
  return updatedInvoice;
};

/**
 * Get all time entries
 * @returns List of time entries
 */
export const getTimeEntries = async (): Promise<TimeEntry[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return get<TimeEntry[]>('/time-entries');
  return MOCK_TIME_ENTRIES;
};

/**
 * Get a time entry by ID
 * @param id Time entry ID
 * @returns Time entry details
 */
export const getTimeEntryById = async (id: string): Promise<TimeEntry | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app: return get<TimeEntry>(`/time-entries/${id}`);
  const timeEntry = MOCK_TIME_ENTRIES.find((t) => t.id === id);
  return timeEntry || null;
};

/**
 * Create a new time entry
 * @param timeEntryData Time entry data
 * @returns Created time entry
 */
export const createTimeEntry = async (timeEntryData: TimeEntryCreateInput): Promise<TimeEntry> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return post<TimeEntry>('/time-entries', timeEntryData);
  
  // Mock implementation
  // Calculate duration in hours
  const startTime = new Date(`${timeEntryData.date}T${timeEntryData.startTime}:00`);
  const endTime = new Date(`${timeEntryData.date}T${timeEntryData.endTime}:00`);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  
  // Calculate amount
  const rate = timeEntryData.billable ? (timeEntryData.rate || 200) : 0;
  const amount = timeEntryData.billable ? rate * durationHours : 0;
  
  const newTimeEntry: TimeEntry = {
    id: `${Date.now()}`,
    description: timeEntryData.description,
    date: timeEntryData.date,
    startTime: timeEntryData.startTime,
    endTime: timeEntryData.endTime,
    duration: durationHours,
    caseId: timeEntryData.caseId || null,
    caseName: timeEntryData.caseId ? 'Mock Case' : null, // In a real app, this would come from the API
    clientId: timeEntryData.caseId ? 'mock-client-id' : null, // In a real app, this would come from the API
    clientName: timeEntryData.caseId ? 'Mock Client' : null, // In a real app, this would come from the API
    billable: timeEntryData.billable,
    billed: false,
    rate,
    amount,
    notes: timeEntryData.notes || '',
    userId: '1', // Current user ID
    userName: 'John Doe', // Current user name
  };
  
  return newTimeEntry;
};

/**
 * Update a time entry
 * @param timeEntryData Time entry data
 * @returns Updated time entry
 */
export const updateTimeEntry = async (timeEntryData: TimeEntryUpdateInput): Promise<TimeEntry> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return put<TimeEntry>(`/time-entries/${timeEntryData.id}`, timeEntryData);
  
  // Mock implementation
  const existingTimeEntry = MOCK_TIME_ENTRIES.find((t) => t.id === timeEntryData.id);
  
  if (!existingTimeEntry) {
    throw new Error('Time entry not found');
  }
  
  // Calculate duration if start/end times are updated
  let duration = existingTimeEntry.duration;
  if (timeEntryData.startTime && timeEntryData.endTime && timeEntryData.date) {
    const startTime = new Date(`${timeEntryData.date}T${timeEntryData.startTime}:00`);
    const endTime = new Date(`${timeEntryData.date}T${timeEntryData.endTime}:00`);
    const durationMs = endTime.getTime() - startTime.getTime();
    duration = durationMs / (1000 * 60 * 60);
  } else if (timeEntryData.duration !== undefined) {
    duration = timeEntryData.duration;
  }
  
  // Calculate amount
  const billable = timeEntryData.billable !== undefined ? timeEntryData.billable : existingTimeEntry.billable;
  const rate = timeEntryData.rate !== undefined ? timeEntryData.rate : existingTimeEntry.rate;
  const amount = billable ? rate * duration : 0;
  
  const updatedTimeEntry: TimeEntry = {
    ...existingTimeEntry,
    ...timeEntryData,
    duration,
    billable,
    rate,
    amount,
  };
  
  return updatedTimeEntry;
};

/**
 * Delete a time entry
 * @param id Time entry ID
 * @returns Success status
 */
export const deleteTimeEntry = async (id: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return del<{ success: boolean }>(`/time-entries/${id}`);
  
  // Mock implementation
  return { success: true };
};

/**
 * Mark time entries as billed
 * @param ids Time entry IDs
 * @param invoiceId Invoice ID
 * @returns Success status
 */
export const markTimeEntriesAsBilled = async (ids: string[], invoiceId: string): Promise<{ success: boolean }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // In a real app: return put<{ success: boolean }>('/time-entries/mark-billed', { ids, invoiceId });
  
  // Mock implementation
  return { success: true };
};
